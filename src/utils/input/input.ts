import type { MovableParameters } from '../../types';
import { normalizeDelta } from '../normalizeDelta';

/**
 *
 * @internal
 *
 * @param node
 * @param parameters
 * @returns
 */
export function input(node: HTMLElement, parameters: Partial<MovableParameters>) {
  return {
    enabled: parameters.enabled ?? true,
    parent: parameters.limit?.parent,
    normalizedDelta: normalizeDelta(parameters.limit?.delta),
    cache: parameters.cache ?? 'none',
    trigger: parameters.trigger ?? node,
  };
}
