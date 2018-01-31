import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import AppLayout from './components/AppLayout';
import createRouter from './createRouter';

const router = createRouter(true);

const app = (
  <RouterProvider router={router}>
    <AppLayout />
  </RouterProvider>
);

router.start(() => {
  ReactDOM.render(app, document.getElementById('root'));
});
