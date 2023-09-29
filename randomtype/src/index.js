import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './redux/store/store';
import state from './redux/state/state';
// import dotenv from "dotenv"
// import reportWebVitals from './reportWebVitals';
// require('dotenv').config("RandomType/randomtype/.env")
axios.defaults.baseURL = "http://localhost:5000";
// store.subscribe(() => console.log("show reducers => ", store.getState()))
localStorage.setItem("typingData", localStorage.getItem("typingData") || JSON.stringify(state)) // store the state into localstorage
// if(localStorage.getItem("typingData")===null) {localStorage.setItem("typingData", JSON.stringify(state))} // store the state into localstorage
console.log("index.js");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
        <App />
    </Provider>
  </BrowserRouter >
);

// reportWebVitals(console.log);
