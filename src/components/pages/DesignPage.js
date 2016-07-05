/*
  DesignPage.js
  This is page
  with constructor' grid
  of new user design
*/

import React, {Component} from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../style/DesignPageStyle';

export default class DesignPage extends Component {
  render(){
    return (
      <View>
        <Text style={styles.caption}>DesignPage Component</Text>
      </View>
    );
  }
}
