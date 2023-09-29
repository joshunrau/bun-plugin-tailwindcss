# bun-plugin-tailwindcss

## About

This is a Bun plugin that enables support for TailwindCSS. As custom CSS loaders are not yet supported by Bun (as of September 2023), this plugin intercepts imports for `.css` files and processes them using postcss. The resulting code is minified and injected into the document head with JavaScript.

## Install

```shell
bun add --dev bun-plugin-tailwindcss
```
