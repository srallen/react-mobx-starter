import React from 'react';
import Nav from './components/Nav';
import Main from '../Main';

export default function App(props) {
  return (
    <div className="app">
      <aside>
        <Nav />
      </aside>

      <main>
        <Main />
      </main>
    </div>
  );
}
