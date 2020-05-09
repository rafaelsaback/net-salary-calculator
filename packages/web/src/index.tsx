import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';
import { Provider } from 'react-redux';
import store from './redux/store';

const AppWithHotReloading = hot(App);

ReactDOM.render(
  <Provider store={store}>
    <AppWithHotReloading />
  </Provider>,
  document.getElementById('app'),
);
