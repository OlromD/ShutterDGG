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
import ApplicationSideMenuHOC from './src/components/hoc/ApplicationSideMenuHOC';

class App extends Component {

  render() {
    return (
          <View style={styles.applicationContainer}>
            <Navigator
              initialRoute={{id : 'MainPage', name : 'Index'}}
              renderScene={this.renderScene.bind(this)}
              configureScene={this.configureScene.bind(this)}
            />
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
    let MixinComponent;
    // alert(routeID);
    if (routeID === 'MainPage'){
      MixinComponent = ApplicationSideMenuHOC(MainPage);
      return <MixinComponent navigator={navigator}/>
    }
    if (routeID === 'DesignPage'){
      MixinComponent = ApplicationSideMenuHOC(DesignPage);
      return <MixinComponent navigator={navigator}/>
    }
  }
}

AppRegistry.registerComponent('ShutterDGG', () => App);
