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
  ScrollView
} from 'react-native';
import styles from '../../style/MainPageStyle';

const PAGE_BACKGROUND = require('./img/main-page-bg.jpg'),
      LOGO = require('./img/main-page-logo.png'),
      SOCIAL_ICONS = {
        twitter : {
          url : 'http://twitter.com',
          img : require('./img/twitter.png')
        },
        googlePlus : {
          url : 'http://google.com',
          img : require('./img/googlePlus.png')
        },
        facebook : {
          url : 'http://facebook.com',
          img : require('./img/facebook.png')
        }
      },
      DGG_WEBSITE = 'http://dreamglassgroup.com';

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
          <Text style={styles.applicationName}>CONVERTICAL HORISONTAL AND VERTICAL</Text>
          <Text style={styles.applicationName}>SHUTTER</Text>
          <Text style={styles.applicationName}>&</Text>
          <Text style={styles.applicationName}>CHECKERED PANEL</Text>
          <Text style={styles.byText}>BY</Text>
          <Image style={styles.logo} source={LOGO}></Image>
          <Text style={styles.enterDimensionsText}>Enter Dimensions</Text>
          <Text style={styles.unitOfMeasurement}>(in mm)</Text>
          <View style={styles.dimensionsContainer}>
            <TextInput
              style={styles.dimensionTextField}
              placeholder="Width"
              value={this.state.glassDimensions.width}
              onChangeText={value => this.setState(Object.assign(this.state.glassDimensions, {width: value}))}
            />
            <TextInput
              style={styles.dimensionTextField}
              placeholder="Height"
              value={this.state.glassDimensions.height}
              onChangeText={value => this.setState(Object.assign(this.state.glassDimensions, {height: value}))}
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
    // alert('Width: ' + _self.state.glassDimensions.width + ' Height: ' + _self.state.glassDimensions.height);
    this.props.navigator.push({
      id : 'DesignPage',
      name: 'Constructor'
    });
  }
}
