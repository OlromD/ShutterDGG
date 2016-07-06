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
  Image,
  TextInput,
  Linking,
  ScrollView,
  Alert
} from 'react-native';
import styles from '../../style/MainPageStyle';

const isNumeric = function(n){
  return !isNaN(parseFloat(n)) && isFinite(n);
};

const LOGO = require('./mainpagelogo.png'),
      SOCIAL_ICONS = {
        twitter : {
          url : 'http://twitter.com',
          img : require('./twitter.png')
        },
        googlePlus : {
          url : 'http://google.com',
          img : require('./googleplus.png')
        },
        facebook : {
          url : 'http://facebook.com',
          img : require('./facebook.png')
        }
      },
      DGG_WEBSITE = 'http://dreamglassgroup.com';
const glassValidationObject = {
  widthDivisor : 30,
  heightDivisor: 30,
  isGlassDimensionsValid : function(dim){
      if (!isNumeric(dim.width) || !isNumeric(dim.height))
        return false;
      if (dim.width % this.widthDivisor !== 0 || dim.height % this.heightDivisor !== 0)
        return false;
      return true;
  },
  showValidationError : function(){
    Alert.alert(
      'Dimensions are wrong.',
      `Each glass dimension must be a number. Glass width must be divisible by ${this.widthDivisor} and glass height must be divisible by ${this.heightDivisor}.`,
      [
        // alert buttons
        {
          text : 'GOT IT!'
        }
      ]
    );
  }
};

export default class MainPage extends Component {
  constructor(props){
    super(props);
    _self = this;
    this.state = {
      glassDimensions : {
        width : '',
        height: ''
      }
    };
  }
  render(){
    return (
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.container}>
          <Text style={styles.applicationCaption}>DYNAMIC</Text>
          <Text style={styles.applicationName}>SHUTTER</Text>
          <Image style={styles.logo} source={LOGO}></Image>
          <Text style={styles.enterDimensionsText}>Enter Dimensions</Text>
          <Text style={styles.unitOfMeasurement}>(in cm)</Text>
          <View style={styles.dimensionsContainer}>
            <TextInput
              style={styles.dimensionTextField}
              placeholder="Width"
              value={this.state.glassDimensions.width}
              onChangeText={value => this.setState(Object.assign(this.state.glassDimensions, {width: value}))}
              keyboardType="numeric"
            />
            <TextInput
              style={styles.dimensionTextField}
              placeholder="Height"
              value={this.state.glassDimensions.height}
              onChangeText={value => this.setState(Object.assign(this.state.glassDimensions, {height: value}))}
              keyboardType="numeric"
            />
          </View>
          <TouchableHighlight style={styles.confirmButton} onPress={this._confirmButtonPress.bind(this)}>
            <Text style={styles.confirmButtonText}>CONFIRM</Text>
          </TouchableHighlight>
          <View style={styles.socialIcons}>
            <Text
              style={styles.dreamglassgroupText}
              onPress={() => this._openURL(DGG_WEBSITE)}>
              dreamglassgroup.com
            </Text>
            <View style={styles.socialIconsContainer}>
            <TouchableHighlight onPress={() => this._openURL(SOCIAL_ICONS.twitter.url)}>
              <Image
                style={styles.socialIcon}
                source={SOCIAL_ICONS.twitter.img}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this._openURL(SOCIAL_ICONS.googlePlus.url)}>
              <Image
                style={styles.socialIcon}
                source={SOCIAL_ICONS.googlePlus.img}
              />
            </TouchableHighlight>
            <TouchableHighlight onPress={() => this._openURL(SOCIAL_ICONS.facebook.url)}>
              <Image
                style={styles.socialIcon}
                source={SOCIAL_ICONS.facebook.img}
              />
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </ScrollView>
    );
  }

  _openURL(url){
    Linking.openURL(url)
      .catch(err => {
        console.err('An error occurred ', err);
      });
  }

  _confirmButtonPress(){
    if (!glassValidationObject.isGlassDimensionsValid(_self.state.glassDimensions)){
      glassValidationObject.showValidationError();
      return;
    }
    this.props.navigator.push({
      id : 'DesignPage',
      name: 'Constructor'
    });
  }
}
