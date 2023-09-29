import fs from 'fs/promises';
import path from 'path';

import tailwindcssPlugin from 'bun-plugin-tailwindcss';
import { renderToReadableStream } from 'react-dom/server';

import { App } from './App';

const PROJECT_ROOT = path.resolve(import.meta.dir, '..');
const PUBLIC_DIR = path.resolve(PROJECT_ROOT, 'public');
const BUILD_DIR = path.resolve(PROJECT_ROOT, 'dist');

await fs.rm(BUILD_DIR, { recursive: true, force: true });
await fs.mkdir(BUILD_DIR);

await Bun.build({
  entrypoints: [path.resolve(import.meta.dir, 'App.tsx'), path.resolve(import.meta.dir, 'hydrate.tsx')],
  minify: true,
  outdir: BUILD_DIR,
  plugins: [tailwindcssPlugin()],
  target: 'browser',
  splitting: true
});

const buildFiles = await fs.readdir(BUILD_DIR).then((files) => files.map((file) => path.resolve(BUILD_DIR, file)));
const publicFiles = await fs.readdir(PUBLIC_DIR).then((files) => files.map((file) => path.resolve(PUBLIC_DIR, file)));
const staticFiles = [...buildFiles, ...publicFiles];

const server = Bun.serve({
  fetch: async (request) => {
    const url = new URL(request.url);
    console.log(`${request.method} ${url.pathname}`);
    for (const filename of staticFiles) {
      if (filename.endsWith(url.pathname)) {
        return new Response(Bun.file(filename));
      }
    }
    const stream = await renderToReadableStream(<App />, {
      bootstrapModules: ['/hydrate.js']
    });
    return new Response(stream, {
      headers: { 'Content-Type': 'text/html; charset=utf-8' }
    });
  }
});

console.log(`Application is running on port ${server.port}`);
