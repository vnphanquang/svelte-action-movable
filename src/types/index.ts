/**
 * @public
 */
export type MovableCachePolicy = 'session' | 'storage' | 'none';

/**
 * @public
 */
export type MovableLimitDelta = `${number}px` | `${number}%`;

/**
 * @public
 */
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

/**
 * @public
 *
 * Trigger node displacement on mousedown
 */
export interface MovableParameters {
  enabled: boolean;
  /** Set a limit within which node can be moved */
  limit?: MovableLimit;
  /** Cache policy for the last known position */
  cache: MovableCachePolicy;
  /** A node that triggers mousedown event, otherwise the node itself is the trigger */
  trigger?: HTMLElement;
}
