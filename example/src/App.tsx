import { Counter } from './components/Counter';

export const App = () => (
  <html lang="en">
    <head>
      <meta charSet="UTF-8" />
      <meta content="width=device-width, initial-scale=1.0" name="viewport" />
      <title>Example App</title>
    </head>
    <body className="bg-slate-900 text-slate-100">
      <div className="container flex flex-col items-center">
        <h1 className="text-3xl my-6 font-semibold">Example App</h1>
        <div className="mt-56">
          <Counter />
        </div>
      </div>
    </body>
  </html>
);
