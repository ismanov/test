/**
 * @format
 */
import React from 'react';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';

import {AppRegistry} from 'react-native';
import App from './App';
import {name as appName} from './app.json';

AppRegistry.registerComponent(appName, () => () => (
  <Provider store={store}>
    <App />
  </Provider>
));
