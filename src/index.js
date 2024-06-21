import React from 'react';
import ReactDOM from 'react-dom/client';
import {Provider} from 'react-redux';
import App from './App';
import './index.css';
import middleware from './middleware';
import reducer from "./reducers";
import { createStore } from "redux";
import { BrowserRouter as Router } from "react-router-dom";


const store = createStore(reducer, middleware);

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
    <Provider store={store}>
        <Router>
            <App />
        </Router>
    </Provider>
);