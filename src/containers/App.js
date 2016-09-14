import React, { Component } from 'react';
import {
  Navigator,
  View
} from 'react-native';

import MainPage from '../components/MainPage';
import DesignPage from '../components/DesignPage';
import styles from '../style/ApplicationStyle.js';

const navigationConfig = {
  'MainPage': {
    component: MainPage,
  },
  'DesignPage' : {
    component : DesignPage
  }
}


export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      width: '',
      height: ''
    };
    this.navigatorRenderScene = this.navigatorRenderScene.bind(this);
    this.navigatorConfigureScene = this.navigatorConfigureScene.bind(this);
    this._setDimensions = this._setDimensions.bind(this);
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
            <Navigator initialRoute = { { id : 'MainPage' } }
                       renderScene = { this.navigatorRenderScene }
                       configureScene = { this.navigatorConfigureScene }
            />
          </View>
    );
  }

  navigatorConfigureScene(route){
    if (route.sceneConfig){
      return route.sceneConfig
    }
    return Navigator.SceneConfigs.FloatFromBottomAndroid;
  }

  navigatorRenderScene(route, navigator){
    const routeID = route.id;
    if (routeID === 'MainPage'){
      return (
        <MainPage setDimensions = { this._setDimensions } 
                  navigator = { navigator }/>
      );
     }
     if (routeID === 'DesignPage'){
       // return <DesignPage width={'150'} height={'300'} navigator={navigator}/>
       
       return (
          <DesignPage width = { this.state.width } 
                      height = { this.state.height } 
                      navigator = { navigator }/>
       );
    }
  }
}
