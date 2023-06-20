import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import {BrowserRouter} from 'react-router-dom';
// import reportWebVitals from './reportWebVitals';
axios.defaults.baseURL = "http://localhost:5000";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

// reportWebVitals(console.log);
