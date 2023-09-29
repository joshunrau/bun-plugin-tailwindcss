import fs from 'fs/promises';
import path from 'path';

import autoprefixer from 'autoprefixer';
import { type BunPlugin } from 'bun';
import cssnano from 'cssnano';
import postcss from 'postcss';
import tailwindcss from 'tailwindcss';

const tailwindcssPlugin = (): BunPlugin => ({
  name: 'bun-plugin-tailwindcss',
  setup: (build) => {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const css = await fs.readFile(args.path, 'utf-8');
      const template = await fs.readFile(path.resolve(import.meta.dir, 'inject-styles.ts'), 'utf-8');
      const processor = postcss([autoprefixer(), tailwindcss(), cssnano()]);
      const result = await processor.process(css, { from: args.path });
      const outfile = template.replace('{{ STYLES }}', result.css);
      return {
        contents: outfile,
        loader: 'ts'
      };
    });
  }
});

export default tailwindcssPlugin;
