import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import styles from '../../style/AllDesignsPageStyle';


export default class AllDesignsPage extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Text style={styles.caption}>All Designs Page</Text>
      </View>
    );
  }
}
