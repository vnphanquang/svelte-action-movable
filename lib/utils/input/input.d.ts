import type { MovableParameters } from '../../types';
/**
 *
 * @internal
 *
 * @param node
 * @param parameters
 * @returns
 */
export declare function input(node: HTMLElement, parameters: Partial<MovableParameters>): {
    enabled: boolean;
    parent: HTMLElement | undefined;
    normalizedDelta: {
        x: {
            unit: "px" | "%";
            value: number;
        };
        y: {
            unit: "px" | "%";
            value: number;
        };
    };
    cache: import("../../types").MovableCachePolicy;
    trigger: HTMLElement;
};
//# sourceMappingURL=input.d.ts.map