import React, {Component} from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Image,
  TextInput,
  Linking,
  ScrollView,
} from 'react-native';

import GlassDimensionsPicker from './GlassDimensionsPicker.js';
import styles from '../style/MainPageStyle';
import { SOCIAL_ICONS, DGG_WEBSITE } from '../config/SocialLinksConfig';
import { LOGO, FIRST_NAME, SECOND_NAME } from '../config/ApplicationConfig';

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
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.applicationCaption}>{ FIRST_NAME }</Text>
            <Text style={styles.applicationName}>{ SECOND_NAME }</Text>
            <Text style={[ styles.applicationName, {color: '#fff', fontSize: 20} ]}>BY</Text>
            <Image style={styles.logo} source={LOGO}></Image>
            <Text style={styles.enterDimensionsText}>Choose Dimensions</Text>
            <Text style={styles.unitOfMeasurement}>(in cm)</Text>
            <GlassDimensionsPicker setDimensions={this.props.setDimensions} navigator={this.props.navigator}/>
          </View>
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
    );
  }

  _openURL(url){
    Linking.openURL(url)
      .catch(err => {
        console.err('An error occurred ', err);
      });
  }
}
