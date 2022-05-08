import type { MovableLimit } from '../../types';
/**
 * @internal
 *
 * MovableLimit interface normalized to use in runtime
 */
declare type NormalizedLimit = {
    unit: 'px' | '%';
    value: number;
};
/**
 * @internal
 *
 * @param delta - MovableLimit to normalize
 * @returns
 */
export declare function normalizeDelta(delta?: MovableLimit['delta']): {
    x: NormalizedLimit;
    y: NormalizedLimit;
};
export {};
//# sourceMappingURL=normalizeDelta.d.ts.map