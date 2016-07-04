/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableHighlight
} from 'react-native';

class ShutterDGG extends Component {
  render() {
    return (
        <View style={styles.container}>
          <Text style={styles.lable}>CONVERTIBLE HORIZONTAL AND VERTICAL</Text>
          <Text  style={styles.h1}>SHUTTER</Text>
          <Text  style={styles.h2}>&</Text>
          <Text  style={styles.h1}>CHECKERED PANEL</Text>
          <Text  style={styles.h2}>BY</Text>
          <Image source={require('./img/logo.png')} style={styles.logo}></Image>
          <Text style={styles.dimension}>Enter a dimension</Text>
          <Text style={styles.hint}>(in mm)</Text>
          <View>
            <TextInput style={styles.textField} placeholder='Width'/>
            <TextInput style={styles.textField} placeholder='Height'/>
          </View>
          <TouchableHighlight style={styles.confirmButton}>
            <Text style={styles.lable}>CONFIRM</Text>
          </TouchableHighlight>
        </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#444',
  },
  confirmButton : {
    backgroundColor : '#44f',
    padding: 5,
    margin: 5,
    width: 100
  },
  lable: {
    fontSize: 16,
    color : '#fff',
    textAlign: 'center',
    fontWeight: '800',
    margin: 5,
  },
  h1: {
    fontSize: 20,
    color : '#fff',
    textAlign: 'center',
    fontWeight: '800',
    margin: 5,
  },
  h2: {
    fontSize: 16,
    color : '#fff',
    textAlign: 'center',
    fontWeight: '800',
  },
  logo : {
    width: 200,
    height: 80,
    resizeMode : 'stretch',
    margin : 5
  },
  dimension : {
    color : '#fff',
    fontSize: 17,
    textAlign: 'center'
  },
  hint : {
    color : '#fff',
    fontSize: 15,
    textAlign: 'center'
  },
  textField : {
    width: 100,
    backgroundColor : '#fff',
    borderColor: '#ccc',
    borderWidth : 1,
    fontSize: 16,
    padding: 0,
    paddingLeft : 5,
    margin: 5,
    borderRadius: 5
  }
});

AppRegistry.registerComponent('ShutterDGG', () => ShutterDGG);
