import { useState } from 'react';

export const Counter = () => {
  const [count, setCount] = useState(0);
  return (
    <div className="p-8 border leading-none rounded-md bg-slate-800 space-y-5 text-slate-300 border-slate-600">
      <h3 className="text-lg font-semibold">Counter</h3>
      <p>Count: {count}</p>
      <button className="bg-sky-700 p-2 rounded" onClick={() => setCount(count + 1)}>
        Increment Count
      </button>
    </div>
  );
};
