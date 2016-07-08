import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';

import styles from '../../style/SettingsPageStyle';

export default class SettingsPage extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>Settings Page</Text>
      </View>
    );
  }
}
