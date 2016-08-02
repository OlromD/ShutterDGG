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
              initialRoute={ { id : 'MainPage' } }
              renderScene={this.navigatorRenderScene.bind(this)}
              configureScene={this.navigatorConfigureScene.bind(this)}
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
      return <MainPage setDimensions={this._setDimensions.bind(this)} navigator={navigator}/>
     }
     if (routeID === 'DesignPage'){
       return <DesignPage width={this.state.width} height={this.state.height} navigator={navigator}/>
       // return <DesignPage width={180} height={360} navigator={navigator}/>
    }
  }
}
