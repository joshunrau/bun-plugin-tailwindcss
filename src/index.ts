import os from 'os';
import path from 'path';

import { type BunPlugin } from 'bun';
import postcss, { type AcceptedPlugin } from 'postcss';

type PostCSSPluginOptions = {
  plugins?: AcceptedPlugin[];
};

const postcssPlugin = (options?: PostCSSPluginOptions): BunPlugin => ({
  name: 'bun-plugin-postcss',
  setup: (build) => {
    const tmpDir = os.tmpdir();
    build.onLoad({ filter: /\.css$/ }, async (args) => {
      const processor = postcss(options?.plugins);
      const outfile = path.resolve(tmpDir, path.basename(args.path));
      const result = await processor.process(args.path, { from: args.path, to: outfile });
      return {
        contents: result.css,
        loader: 'file'
      };
    });
  }
});

export { postcssPlugin as default, type PostCSSPluginOptions };
