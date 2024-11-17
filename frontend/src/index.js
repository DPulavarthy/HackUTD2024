// Import dependencies.
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';

// Import pages.
import Upload from './pages/Upload';
import Login from './pages/Login';
import Home from './pages/Home';

// Import styles.
import './index.css';

// Create a router.
const router = createBrowserRouter([
  { path: "upload", element: <Upload /> },
  { path: "login", element: <Login /> },
  { path: "/", element: <Home /> },
]);

// Render the router.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
