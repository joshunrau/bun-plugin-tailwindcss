import fs from 'fs/promises';
import path from 'path';

import { type BunPlugin } from 'bun';
import postcss, { type AcceptedPlugin } from 'postcss';

type PostCSSPluginOptions = {
  buildDir: string;
  plugins?: AcceptedPlugin[];
};

const postcssPlugin = (options: PostCSSPluginOptions): BunPlugin => ({
  name: 'bun-plugin-postcss',
  setup: (build) => {
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const processor = postcss(options.plugins);
      const outfile = path.resolve(options.buildDir, path.basename(args.path));
      const css = await fs.readFile(args.path, 'utf-8');
      const result = await processor.process(css, { from: args.path, to: outfile });
      return {
        contents: result.css
      };
    });
  }
});

export { postcssPlugin as default, type PostCSSPluginOptions };
