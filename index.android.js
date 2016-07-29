import React, { Component } from 'react';
import {
  AppRegistry
} from 'react-native';
import App from './src/containers/App.js';

class ShutterDGGApp extends Component {
  render(){
    return (
      <App/>
    );
  }
}

AppRegistry.registerComponent('ShutterDGG', () => ShutterDGGApp);
