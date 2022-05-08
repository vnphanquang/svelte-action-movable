import { normalizeDelta } from '../normalizeDelta';
/**
 *
 * @internal
 *
 * @param node
 * @param parameters
 * @returns
 */
export function input(node, parameters) {
    return {
        enabled: parameters.enabled ?? true,
        parent: parameters.limit?.parent,
        normalizedDelta: normalizeDelta(parameters.limit?.delta),
        cache: parameters.cache ?? 'none',
        trigger: parameters.trigger ?? node,
    };
}
//# sourceMappingURL=input.js.map