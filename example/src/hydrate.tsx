/// <reference lib="dom" />
/// <reference lib="dom.iterable" />

import { hydrateRoot } from 'react-dom/client';

import { App } from './App';
import './main.css';

hydrateRoot(document, <App />);
