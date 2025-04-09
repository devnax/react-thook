import React, { useMemo } from 'react';
import { createRoot } from 'react-dom/client';
import thook from './src'

const counter = thook({
  state: {
    count: 0,
    title: "User Counter",
  },
  template() {
    const count = this.state.get('count')
    return (
      <div>
        <h1>{this.options.title}: {count}</h1>
        <button onClick={() => {
          this.state.set('count', count + 1)
          this.emit("increment")
        }}>Increment</button>
        <button onClick={() => this.state.set('count', count - 1)}>Decrement</button>
      </div>)
  },
})

const Counter = new counter({
  title: "Hello Counter",
})

Counter.on("increment", function () {
  Counter.methods.submit()
})


const App = () => {
  return (
    <div style={{ fontFamily: 'monospace,math, sans-serif', textAlign: 'center', marginTop: '50px' }}>
      <Counter.render />
    </div>
  );
}
const rootEle = document.getElementById('root')
if (rootEle) {
  const root = createRoot(rootEle);
  root.render(<App />);
}
