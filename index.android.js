/*
  index.android.js of ShutterDGG
*/
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator
} from 'react-native';

import MainPage from './src/components/pages/MainPage';
import DesignPage from './src/components/pages/DesignPage';

class App extends Component {

  render() {
    return (
        <Navigator
          initialRoute={{id : 'MainPage', name : 'Index'}}
          renderScene={this.renderScene.bind(this)}
          configureScene={this.configureScene.bind(this)}
          />
    );
  }

  // navigator configureScene function
  configureScene(route){
    if (route.sceneConfig){
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.FloatFromRight;
  }

  // navigator renderScene function
  renderScene(route, navigator){
    const routeID = route.id;
    // alert(routeID);
    if (routeID === 'MainPage'){
      return <MainPage
                navigator={navigator}
                />
    }
    if (routeID === 'DesignPage'){
      return <DesignPage
                navigator={navigator}
                />
    }
  }
}

AppRegistry.registerComponent('ShutterDGG', () => App);
