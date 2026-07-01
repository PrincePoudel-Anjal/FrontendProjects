import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from "react-router-dom";
import {createBrowserRouter,RouterProvider} from "react-router-dom"
import Dashboard from './Dashboard/Dashboard.jsx';

const router = createBrowserRouter([
  {path:"/",element:<App/>}, 
  {path:"/dashboard",element:<Dashboard/>}
]);

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <RouterProvider router={router}/>
  </StrictMode>
);


