import React from 'react';
import ReactDOM from 'react-dom';
import 'semantic-ui-css/semantic.min.css'
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
// import rootReducer from './reducers/root'
// import createRootReducer from './reducers/root'
// import { applyMiddleware, compose, createStore } from 'redux'
// import { createBrowserHistory } from 'history'
// import { routerMiddleware } from 'connected-react-router'
// import { Route, Switch } from 'react-router' // react-router v4/v5
// import { ConnectedRouter } from 'connected-react-router'
import configureStore, { history } from './configureStore'

const store = configureStore(/* provide initial state if any */)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
