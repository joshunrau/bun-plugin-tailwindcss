/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

const injectStyles = () => {
  const style = document.createElement('style');
  style.textContent = String.raw`{{ STYLES }}`;
  document.head.appendChild(style);
};

injectStyles();
