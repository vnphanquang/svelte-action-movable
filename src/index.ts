export type MovableCachePolicy = 'session' | 'storage' | 'none';
export type MovableLimitDelta = `${number}px` | `${number}%`;
export type MovableLimit = {
  /**
   * Move node within this parent node
   */
  parent?: HTMLElement;
  /**
   * Move node within the range [-delta, +delta] for each axis
   *
   * - If only one value is provided, it will be applied to both axes
   * - If parent is set, the delta value will be added beyond the parent bounds. Ex: for y-axis [-delta + parent.top, parent.bottom + delta].
   * - If percentage is used, it will be relative to the width / height of the node itself.
   */
  delta?:
    | {
        x: MovableLimitDelta;
        y: MovableLimitDelta;
      }
    | MovableLimitDelta;
};

/** Trigger node displacement on mousedown */
export interface MovableParameters {
  enabled: boolean;
  /** Set a limit within which node can be moved */
  limit?: MovableLimit;
  /** Cache policy for the last known position */
  cache: MovableCachePolicy;
  /** A node that triggers mousedown event, otherwise the node itself is the trigger */
  trigger?: HTMLElement;
}

type NormalizedLimit = {
  unit: 'px' | '%';
  value: number;
};

function normalizeDelta(delta?: MovableLimit['delta']): { x: NormalizedLimit; y: NormalizedLimit } {
  const x: NormalizedLimit = { unit: 'px', value: 0 };
  const y: NormalizedLimit = { unit: 'px', value: 0 };

  const extractUnit = (text: string, axis?: 'x' | 'y'): 'px' | '%' => {
    const unit = text.slice(-1);
    if (unit !== '%' && unit !== 'px') {
      throw new Error(`Invalid delta ${axis ?? ''} unit. Only 'px' and '%' are supported.`);
    }
    return unit;
  };

  if (delta) {
    if (typeof delta === 'string') {
      x.unit = y.unit = extractUnit(delta);
      x.value = y.value = parseInt(delta, 10);
      x.value = y.value = parseInt(delta.slice(0, -1));
    } else {
      x.unit = extractUnit(delta.x, 'x');
      x.value = parseInt(delta.x.slice(0, -1));

      y.unit = extractUnit(delta.y, 'y');
      y.value = parseInt(delta.y.slice(0, -1));
    }
  }

  return { x, y };
}

function input(node: HTMLElement, parameters: Partial<MovableParameters>) {
  return {
    enabled: parameters.enabled ?? true,
    parent: parameters.limit?.parent,
    normalizedDelta: normalizeDelta(parameters.limit?.delta),
    cache: parameters.cache ?? 'none',
    trigger: parameters.trigger ?? node,
  };
}

export function movable(
  node: HTMLElement,
  parameters: Partial<MovableParameters> = { enabled: true, cache: 'none' },
) {
  let { parent, normalizedDelta, cache, trigger, enabled } = input(node, parameters);

  const lastMouseCoordinates = { x: 0, y: 0 };
  const lastNodeCoordinates = { top: 0, left: 0 };
  let ΣΔx = 0; // total displacement in x-axis
  let ΣΔy = 0; // total displacement in y-axis

  const updateLastMouseCoordinates = (event: MouseEvent) => {
    lastMouseCoordinates.x = event.clientX;
    lastMouseCoordinates.y = event.clientY;
  };

  const updateLastNodeCoordinates = ({ top, left }: { top: number; left: number }) => {
    lastNodeCoordinates.top = top;
    lastNodeCoordinates.left = left;
  };

  const onMouseMove = (event: MouseEvent) => {
    const Δx = event.clientX - lastMouseCoordinates.x;
    const Δy = event.clientY - lastMouseCoordinates.y;
    updateLastMouseCoordinates(event);

    let top = lastNodeCoordinates.top + Δy;
    let left = lastNodeCoordinates.left + Δx;

    const nodeBoundingRect = node.getBoundingClientRect();
    let boundX = 0;
    switch (normalizedDelta.x.unit) {
      case '%':
        boundX = (normalizedDelta.x.value * nodeBoundingRect.width) / 100;
        break;
      case 'px':
        boundX = normalizedDelta.x.value;
        break;
    }

    let boundY = 0;
    switch (normalizedDelta.y.unit) {
      case '%':
        boundY = (normalizedDelta.y.value * nodeBoundingRect.height) / 100;
        break;
      case 'px':
        boundY = normalizedDelta.y.value;
        break;
    }

    if (parent) {
      const insideBoundingRect = parent.getBoundingClientRect();

      const newAbsTop = nodeBoundingRect.top + Δy + boundY;
      if (newAbsTop < insideBoundingRect.top) {
        top += insideBoundingRect.top - newAbsTop;
      } else {
        const newAbsBottom = nodeBoundingRect.bottom + Δy - boundY;
        if (newAbsBottom > insideBoundingRect.bottom) {
          top -= newAbsBottom - insideBoundingRect.bottom;
        }
      }

      const newAbsLeft = nodeBoundingRect.left + Δx + boundX;
      if (newAbsLeft < insideBoundingRect.left) {
        left += insideBoundingRect.left - newAbsLeft;
      } else {
        const newAbsRight = nodeBoundingRect.right + Δx - boundX;
        if (newAbsRight > insideBoundingRect.right) {
          left -= newAbsRight - insideBoundingRect.right;
        }
      }
    } else {
      if (boundX > 0) {
        const newΣΔx = ΣΔx + left - lastNodeCoordinates.left;
        if (newΣΔx > boundX) {
          left -= newΣΔx - boundX;
        } else if (newΣΔx < -boundX) {
          left -= newΣΔx + boundX;
        }
      }

      if (boundY > 0) {
        const newΣΔy = ΣΔy + top - lastNodeCoordinates.top;
        if (newΣΔy > boundY) {
          top -= newΣΔy - boundY;
        } else if (newΣΔy < -boundY) {
          top -= newΣΔy + boundY;
        }
      }
    }

    node.style.left = `${left}px`;
    node.style.top = `${top}px`;

    ΣΔx += left - lastNodeCoordinates.left;
    ΣΔy += top - lastNodeCoordinates.top;
    updateLastNodeCoordinates({ top, left });
  };

  const end = () => {
    document.body.style.userSelect = '';
    document.body.style.cursor = '';
    window.removeEventListener('mousemove', onMouseMove);
    window.removeEventListener('mouseup', end);
    node.dispatchEvent(new CustomEvent('movableend', { detail: node }));
  };

  const onMouseDown = (event: MouseEvent) => {
    node.dispatchEvent(new CustomEvent('movablestart', { detail: node }));

    const computedStyles = getComputedStyle(node);

    // init coordinates
    const regex = '^[-0-9]+';
    const left = parseInt(computedStyles.getPropertyValue('left').match(regex)?.[0] ?? '0');
    const top = parseInt(computedStyles.getPropertyValue('top').match(regex)?.[0] ?? '0');
    updateLastNodeCoordinates({ left, top });

    // init position style
    const position = computedStyles.getPropertyValue('position');
    if (position !== 'relative' && position !== 'absolute') {
      node.style.position = 'relative';
    }

    updateLastMouseCoordinates(event);

    document.body.style.userSelect = 'none';
    document.body.style.cursor = 'move';
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup', end);
  };

  if (enabled) {
    trigger.addEventListener('mousedown', onMouseDown, true);
  }
  return {
    update(parameters: Partial<MovableParameters>) {
      const update = input(node, parameters);

      trigger.removeEventListener('mousedown', onMouseDown, true);
      update.trigger.addEventListener('mousedown', onMouseDown, true);

      if (!enabled && update.enabled) {
        trigger.addEventListener('mousedown', onMouseDown, true);
      } else if (enabled && !update.enabled) {
        trigger.removeEventListener('mousedown', onMouseDown, true);
      }

      ({ parent, normalizedDelta, cache, trigger, enabled } = update);
    },
    destroy() {
      trigger.removeEventListener('mousedown', onMouseDown, true);
    },
  };
}
