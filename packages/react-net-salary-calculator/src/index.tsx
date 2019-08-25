import { hot } from 'react-hot-loader/root';
import React from 'react';
import ReactDOM from 'react-dom';
import App from './app';

const AppWithHotReloading = hot(App);

ReactDOM.render(<AppWithHotReloading />, document.getElementById('app'));
