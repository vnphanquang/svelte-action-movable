import type { MovableParameters } from './types';
/**
 * Trigger node displacement on mousedown (via position.left & position.top)
 * @public
 *
 * @param node - HTMLElement to be moved
 * @param parameters - svelte action parameters
 * @returns svelte action interface
 *
 * @remarks
 *
 * `movable` should be use with element not svelte component
 *
 * ```svelte
 * <-- correct usage-->
 *  <div use:movable />
 *
 * <-- incorrect usage-->
 * <Component use:movable/>
 * ```
 *
 * @example Typical usage
 *
 * ```svelte
 * <script lang="ts">
 *   import arrows from 'svelte-awesome/icons/arrows';
 *   import Icon from 'svelte-awesome/components/Icon.svelte';
 *
 *   let modal = false;
 *   let triggerNode: HTMLElement;
 * </script>
 *
 * <container>
 *   <!-- ... some other content ... -->
 *
 *   {#if modal}
 *     <div
 *       transition:fade={{ duration: 200 }}
 *       class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-sm"
 *       use:movable={{
 *         limit: {
 *           delta: '20%',
 *           parent: containerNode,
 *         },
 *         trigger: triggerNode,
 *       }}
 *       on:movablestart={() => console.log('movable:start')}
 *       on:movableend={() => console.log('movable:end')}
 *     >
 *       <button
 *         bind:this={triggerNode}
 *         class="c-btn-icon absolute top-2 right-10 hover:cursor-move"
 *       >
 *         <Icon data={arrows} />
 *       </button>
 *
 *       <!-- ... some other modal content ... -->
 *     </div>
 * {/if}
 *
 * </container>
 * ```
 *
 */
export declare function movable(node: HTMLElement, parameters?: Partial<MovableParameters>): {
    update(parameters: Partial<MovableParameters>): void;
    destroy(): void;
};
//# sourceMappingURL=movable.d.ts.map