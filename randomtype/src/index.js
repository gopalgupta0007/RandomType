import React, { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from 'axios';
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';
import store, { persistor } from './redux/store/store';
import state from './redux/state/state';
import { Flip, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import data from './redux/state/author';


// import dotenv from "dotenv"
// import reportWebVitals from './reportWebVitals';
// require('dotenv').config("RandomType/randomtype/.env")
axios.defaults.baseURL = "http://localhost:5000";
// store.subscribe(() => console.log("show reducers => ", store.getState()))
localStorage.setItem("typingData", localStorage.getItem("typingData") || JSON.stringify(state)) // store the state into localstorage
// localStorage.setItem("authorId", localStorage.getItem("authorId") || JSON.stringify(data)) // store the state into localstorage
// localStorage.setItem("authorData", localStorage.getItem("authorData"))?JSON.stringify(data):localStorage.getItem("authorData"));
// localStorage.setItem("this", "45")
// if(localStorage.getItem("typingData")===null) {localStorage.setItem("typingData", JSON.stringify(state))} // store the state into localstorage
console.log("index.js");
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <StrictMode>
          <App />
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="colored"
            transition={Flip}
          />
          {/* <ToastContainer /> */}
        </StrictMode>
      </PersistGate>
    </Provider>
  </BrowserRouter >
);

// reportWebVitals(console.log);
