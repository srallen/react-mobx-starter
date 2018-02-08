import React from 'react';
import ReactDOM from 'react-dom';
import { RouterProvider } from 'react-router5';
import { useStrict } from 'mobx';
import { Provider } from 'mobx-react';
import AppLayout from './components/AppLayout';
import createRouter from './createRouter';
import stores from './stores';

// For easier debugging
window._____APP_STATE_____ = stores;

useStrict(true);
const router = createRouter(true);

const app = (
  <RouterProvider router={router}>
    <Provider {...stores}>
      <AppLayout />
    </Provider>
  </RouterProvider>
);

router.start(() => {
  ReactDOM.render(app, document.getElementById('root'));
});
