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

const LOGO = require('./img/mainpagelogo.png'),
      SOCIAL_ICONS = {
        twitter : {
          url : 'https://twitter.com/DreamGlassGroup',
          img : require('./img/twitter.png')
        },
        googlePlus : {
          url : 'https://plus.google.com/107335644429660129984/posts',
          img : require('./img/googleplus.png')
        },
        facebook : {
          url : 'https://www.facebook.com/pages/Dream-Glass-Group/225508604187023?fref=ts',
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
        <View style={styles.container}>
          <View style={styles.header}>
            <Text style={styles.applicationCaption}>DYNAMIC</Text>
            <Text style={styles.applicationName}>SHUTTER</Text>
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
