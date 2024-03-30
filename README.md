> :warning:&nbsp; This package is no longer maintained, since I have stopped using Bun because of the huge numbers of segfaults, which unfortuantely, will probably not be resolved any time soon, if history is any indication.

# bun-plugin-tailwindcss

## About

This is a Bun plugin that enables support for TailwindCSS. As custom CSS loaders are not yet supported by Bun (as of September 2023), this plugin intercepts imports for `.css` files and processes them using postcss. The resulting code is minified and injected into the document head with JavaScript.

## Install

```shell
bun add --dev bun-plugin-tailwindcss
```

## Usage

To enable the plugin, simply import it and add it to your build script. An example with React SRR is provided in the `example` directory.
