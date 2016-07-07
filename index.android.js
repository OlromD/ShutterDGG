/*
  index.android.js of ShutterDGG
*/
import React, { Component } from 'react';
import {
  AppRegistry,
  Navigator,
  View
} from 'react-native';

import MainPage from './src/components/pages/MainPage';
import DesignPage from './src/components/pages/DesignPage';

import ApplicationSideMenu from './src/components/ApplicationSideMenu';
import styles from './src/style/ApplicationStyle.js';

class App extends Component {

  render() {
    return (
          <View style={styles.applicationContainer}>
            <ApplicationSideMenu>
              <Navigator
                initialRoute={{id : 'MainPage', name : 'Index'}}
                renderScene={this.renderScene.bind(this)}
                configureScene={this.configureScene.bind(this)}
              />
            </ApplicationSideMenu>
          </View>
    );
  }

  // navigator configureScene function
  configureScene(route){
    if (route.sceneConfig){
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.FloatFromBottomAndroid;
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
