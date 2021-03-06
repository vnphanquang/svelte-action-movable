# Svelte Action - `use:movable`

# This package has been moved to [the @svelte-put monorepo](https://github.com/vnphanquang/svelte-put/tree/main/packages/actions/movable). You can still use this package as is but a reinstallation is recommended.

```bash
# remove svelte-movable from your package.json

npm install -D @svelte-put/movable
yarn add -D @svelte-put/movable
pnpm add -D @svelte-put/movable
```

<div align="center">

[![npm.badge]][npm] [![bundlephobia.badge]][bundlephobia] [![semantic-release.badge]][semantic-release] [![MIT][license.badge]][license]

[![github.actions.release.badge]][github.actions.release] [![github.release.badge]][github.release]

![demo](./static/images/demo.gif)

</div>

## Table of Contents

<details open>
  <summary>Show / hide</summary>

- [Svelte Action - `use:movable`](#svelte-action---usemovable)
  - [Table of Contents](#table-of-contents)
  - [Changelog](#changelog)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Documentation](#documentation)
    - [Typescript support](#typescript-support)
  - [Contributing](#contributing)
  - [Todos](#todos)

</details>

## [Changelog][github.changelog]

## Installation

```bash
npm install -D svelte-movable
yarn add -D svelte-movable
pnpm add -D svelte-movable
```

## Usage

See [example for typical usage here](./api/docs/svelte-movable.movable.md#example).

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
    onmovablestart?: (event: CustomEvent<import('svelte-movable').MovableEventDetails>) => void;
    // on:movableend
    onmovableend?: (event: CustomEvent<import('svelte-movable').MovableEventDetails>) => void;
  }
}
```

</details>

For detailed documentation, see the [extracted API][github.api].

Quick access to the parameter interface accepted by the action: [MovableParameters][github.api.movableparameters].

**Note**: `MovableParameters` has properties that are all optional. By default you don't need to provide any parameter to the action.

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
[github.contributing]: ./CONTRIBUTING.md
[github.issues]: https://github.com/vnphanquang/svelte-action-movable/issues?q=
[github.api]: ./api/docs/index.md
[github.api.movableparameters]: api/docs/svelte-movable.movableparameters.md
[github.api.movable]: api/docs/svelte-movable.movable.md

<!-- heading badge -->
[npm.badge]: https://img.shields.io/npm/v/svelte-movable
[npm]: https://www.npmjs.com/package/svelte-movable
[bundlephobia.badge]: https://img.shields.io/bundlephobia/minzip/svelte-movable?label=minzipped
[bundlephobia]: https://bundlephobia.com/package/svelte-movable
[semantic-release]: https://github.com/semantic-release/semantic-release
[semantic-release.badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg
[tweet]: https://img.shields.io/twitter/url?style=social&url=https%3A%2F%2Fgithub.com%2vnphanquang%2Fsvelte-action-movable
[tweet.url]: https://twitter.com/intent/tweet?text=svelte-movable%3A%20move%20a%20node%20on%20mousedown%0Ahttps%3A%2F%2Fgithub.com%2Fvnphanquang%2Fsvelte-action-movable
[license.badge]: https://img.shields.io/badge/license-MIT-blue.svg
[license]: ./LICENSE
