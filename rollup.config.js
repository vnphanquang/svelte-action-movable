import { resolve } from 'path';

import typescript from '@rollup/plugin-typescript';
import filesize from 'rollup-plugin-filesize';

/** @type {import('rollup').RollupOptions} */
const config = {
  input: resolve(__dirname, 'src/index.ts'),
  output: {
    sourcemap: true,
    dir: './lib',
    format: 'esm',
  },
  plugins: [
    typescript(),
    filesize(),
  ],
};

export default config;
