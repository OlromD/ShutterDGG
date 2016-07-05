/*
  MainPage.js
  The main page of application
  with dream glass dimension
  and confirmation button
*/

import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image
} from 'react-native';
import styles from '../../style/MainPageStyle';

const PAGE_BACKGROUND = require('./img/main-page-bg.jpg'),
      LOGO = require('./img/main-page-logo.jpg');

export default class MainPage extends Component {
  render(){
    return (
      <Image style={styles.container} source={PAGE_BACKGROUND}>
        <Text style={styles.applicationName}>CONVERTICAL HORISONTAL AND VERTICAL</Text>
        <Text style={styles.applicationName}>SHUTTER</Text>
        <Text style={styles.applicationName}>&</Text>
        <Text style={styles.applicationName}>CHECKERED PANEL</Text>
        <Text style={styles.byText}>BY</Text>
        <Image style={styles.logo} source={LOGO}></Image>
        <TouchableHighlight style={styles.confirmButton} onPress={this._confirmButtonPress.bind(this)}>
          <Text>Confirm</Text>
        </TouchableHighlight>
      </Image>
    );
  }

  _confirmButtonPress(){
    this.props.navigator.push({
      id : 'DesignPage',
      name: 'Constructor'
    });
  }
}
