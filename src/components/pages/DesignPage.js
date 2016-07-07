/*
  DesignPage.js
  This is page
  with constructor' grid
  of new user design
*/

import React, {Component} from 'react';
import {
  View,
  Text,
  ToolbarAndroid
} from 'react-native';
import styles from '../../style/DesignPageStyle';

export default class DesignPage extends Component {
  render(){
    return (
      <Text>Create a new design!</Text>
    );
  }
  onActionSelected( position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }
}
