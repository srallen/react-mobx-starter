import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import App from './components/App';
import createRouter from './createRouter';

const router = createRouter(true);

const app = (
  <RouterProvider router={router}>
    <App />
  </RouterProvider>
);

router.start(() => {
  ReactDOM.render(app, document.getElementById('root'));
});
