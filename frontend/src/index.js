// Import dependencies.
import { createBrowserRouter, RouterProvider, } from "react-router-dom";
import ReactDOM from 'react-dom/client';
import React from 'react';


// Import pages.
import Upload from './pages/Upload';
import Home from './pages/Home';

// Import styles.
import './index.css';

// Create a router.
const router = createBrowserRouter([
  { path: "/", element: <Upload /> },
  { path: "home", element: <Home /> },
]);

// Render the router.
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>
);
