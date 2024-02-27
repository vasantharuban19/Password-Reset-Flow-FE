import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <ToastContainer autoClose={1000}/>
  </React.StrictMode>,
)
