import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom';
//setting  up redux
import { Provider } from 'react-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
/*  Redux Thunk is a middleware – functionality that sits between actions and
   reducers that can change how those actions behave. Redux supports multiple
   sets of middleware that cover the entire application .redux-thunk allows to
   use asynchronous code in action creators due to the middleware wrapping itself
   around the dispattch action, blociking the request until async code is done */
import thunk from 'redux-thunk';

import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
//setting  up redux
import burgerBuilderReducer from './store/reducers/burgerBuilder';
import orderReducer from './store/reducers/order';
import authReducer from './store/reducers/auth';

const composeEnhancers = process.env.NODE_EVN === 'development' ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : null || compose;

// set up devtool advancer and enhancer where composeEnhancers( applyMiddleware(thunk)) is a part of set up
// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
// combine reducers
const rootReducer = combineReducers ({
    burgerBuilder: burgerBuilderReducer,
    order: orderReducer,
    auth: authReducer
});
//setting  up redux
const store = createStore(rootReducer, composeEnhancers (
  applyMiddleware(thunk)
));
// create app instance to pass it down in ReactDOM.render
const app = (
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
 // Everything where the routing is being used has to be wrapped with <BrowserRouter>
ReactDOM.render(app, document.getElementById('root'));
registerServiceWorker();
