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
import NewDesignPage from './src/components/pages/NewDesignPage';
import AllDesignsPage from './src/components/pages/AllDesignsPage';
import SettingsPage from './src/components/pages/SettingsPage';

import ApplicationSideMenu from './src/components/ApplicationSideMenu';
import styles from './src/style/ApplicationStyle.js';
import ApplicationSideMenuHOC from './src/components/hoc/ApplicationSideMenuHOC';

class App extends Component {
  componentDidMount(){
    this.setState({
      width: '',
      height: ''
    });
  }
  _setDimensions(width, height){
    this.setState({
      width: width,
      height: height
    });
  }
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
      return <MainPage setDimensions={this._setDimensions.bind(this)} navigator={navigator}/>
    }
    if (routeID === 'NewDesignPage'){
      MixinComponent = ApplicationSideMenuHOC(NewDesignPage);
      return <NewDesignPage width={this.state.width} height={this.state.height} navigator={navigator}/>
      // return <NewDesignPage width={30} height={60} navigator={navigator}/>
    }
    if (routeID === 'AllDesignsPage'){
      MixinComponent = ApplicationSideMenuHOC(AllDesignsPage);
      return <AllDesignsPage navigator={navigator}/>
    }
  }
}

AppRegistry.registerComponent('ShutterDGG', () => App);
