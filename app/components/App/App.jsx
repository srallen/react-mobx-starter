import React from 'react';
import Main from '../Main';

export default function App(props) {
  return (
    <div className="app">
      <aside>
        <nav><li>About</li></nav>
      </aside>

      <main>
        <Main />
      </main>
    </div>
  );
}
