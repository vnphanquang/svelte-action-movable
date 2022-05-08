# Svelte Action - `use:movable`

<div align="center">

[![github.release.badge]][github.release] [![semantic-release.badge]][semantic-release] [![MIT][license.badge]][license]

[![github.actions.release.badge]][github.actions.release]

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [Svelte Action - `use:movable`](#svelte-action---usemovable)
  - [Table of Contents](#table-of-contents)
  - [Changelog](#changelog)
  - [Usage](#usage)
  - [Documentation](#documentation)
  - [Contributing](#contributing)
  - [Todos](#todos)

</details>

## [Changelog][github.changelog]

## Usage

<details open>
  <summary>Example: show / hide</summary>

While `mousedown` of the trigger `button` element

- `mousemove` will trigger `div` to move accordingly; a `CustomEvent` `movablestart`is dispatched,
- movement will be limited to the border of the `containerNode`, plus and minus 20% of the width & height of the `div` that the action is being used on,
- `mouseup` will stop the movement; a `CustomEvent` `movableend` is dispatched.

```svelte
<script lang="ts">
  import arrows from 'svelte-awesome/icons/arrows';
  import Icon from 'svelte-awesome/components/Icon.svelte';

  let modal = false;
  let triggerNode: HTMLElement;
</script>

<container>
  <!-- ... some other content ... -->

  {#if modal}
    <div
      transition:fade={{ duration: 200 }}
      class="absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 w-full max-w-sm"
      use:movable={{
        limit: {
          delta: '20%',
          parent: containerNode,
        },
        trigger: triggerNode,
      }}
      on:movablestart={(node) => console.log('movable:start', node)}
      on:movableend={(node) => console.log('movable:end', node)}
    >
      <button
        bind:this={triggerNode}
        class="c-btn-icon absolute top-2 right-10 hover:cursor-move"
      >
        <Icon data={arrows} />
      </button>

      <!-- ... some other modal content ... -->
    </div>
{/if}

</container>
```

</details>

## Documentation

### Typescript support

<details open>
  <summary> app.d.ts: show / hide </summary>

```typescript
/// <reference types="@sveltejs/kit" />
/// <reference types="svelte" />

// Typescript support in svelte-kit, see
// https://github.com/sveltejs/language-tools/blob/master/docs/preprocessors/typescript.md#im-using-an-attributeevent-on-a-dom-element-and-it-throws-a-type-error

declare namespace svelte.JSX {
  interface HTMLAttributes<T> {
    // on:movablestart
    onmovablestart?: (event: CustomEvent<HTMLElement>) => void;
    // on:movableend
    onmovableend?: (event: CustomEvent<HTMLElement>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

Quick access to the parameter interface accepted by the action: [MovableParameters][github.api.movableparameters].

**Note**: action accepts `Partial<MovableParameters>`. By default you don't need to provide any option.

## Contributing

[Read Contribution Guide][github.contributing]

## Todos

- [ ] separate helper methods & implement unit tests
- [ ] add field test for svelte kit (integration)

- [ ] CI workflow (github action)
    <br />
<div align="center">

</div>

<p align="center">
  <a href="https://www.buymeacoffee.com/vnphanquang" target="_blank">
    <img
      src="https://cdn.buymeacoffee.com/buttons/v2/default-yellow.png"
      height="60"
      width="217"
      alt="buy vnphanquang a coffee"
    />
  </a>
</p>

<!-- github specifics -->

[github.actions.release.badge]: https://github.com/vnphanquang/svelte-action-movable/actions/workflows/release.yaml/badge.svg
[github.actions.release]: https://github.com/vnphanquang/svelte-action-movable/actions/workflows/release.yaml
[github.release.badge]: https://img.shields.io/github/v/release/vnphanquang/svelte-action-movable
[github.release]: https://github.com/vnphanquang/svelte-action-movable/releases
[github.changelog]: ./CHANGELOG
[github.contributing]: ./CONTRIBUTING
[github.issues]: https://github.com/vnphanquang/svelte-action-movable/issues?q=
[github.api]: ./api/docs/index.md
[github.api.movableparameters]: api/docs/svelte-movable.movableparameters.md

<!-- heading badge -->

[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release.badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[tweet]: https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2vnphanquang%2Fsvelte-action-movable
[tweet.url]: https://twitter.com/intent/tweet?text=svelte-movable%3A%20move%20a%20node%20on%20mousedown%0Ahttps%3A%2F%2Fgithub.com%2Fvnphanquang%2Fsvelte-action-movable
[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
