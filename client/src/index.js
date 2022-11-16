import React from 'react';
import ReactDOM from 'react-dom/client';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
} from 'react-router-dom';

import App from './App';
import router from './router';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <App />
  <RouterProvider router={router} />
);
