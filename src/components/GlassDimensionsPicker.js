import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  TouchableHighlight,
  Alert
} from 'react-native';
import styles from '../style/GlassDimensionsPickerStyle';
import config from '../config/GlassDimensionsConfig';
let widthOptions, heightOptions;
export default class GlassDimensionsPicker extends Component {
  componentWillMount(){
    this.state = {
      width: '',
      height: ''
    }
    widthOptions = this._getWidthDimensionPickerValues();
    heightOptions = this._getHeightDimensionPickerValues();
  }

  _getWidthDimensionPickerValues(){
    return config.width.map((el, index) => <Picker.Item value={el} label={el} key={'width' + index}/>);
  }
  _getHeightDimensionPickerValues(){
    return config.height.map((el, index) => <Picker.Item value={el} label={el} key={'height' + index}/>);
  }

  render(){
    return (
      <View>
        <View style={styles.dimensionsContainer}>
          <Picker
          style={styles.dimensionPicker}
            selectedValue={this.state.width}
            onValueChange={(width) => this.setState({width: width})}>
              {widthOptions}
          </Picker>
          <Picker
          style={styles.dimensionPicker}
            selectedValue={this.state.height}
            onValueChange={(height) => this.setState({height: height})}>
              {heightOptions}
          </Picker>
        </View>
        <TouchableHighlight style={styles.confirmButton} onPress={this._confirmButtonPress.bind(this)}>
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
        </TouchableHighlight>
      </View>
    );
  }
  _confirmButtonPress(){
    if (this.state.width === 'Width' || this.state.height === 'Height'){
      Alert.alert('Dimensions are not selected!', 'Please, choose width and height of your Dream Glass from the select boxes.', [{text: 'GOT IT!'}]);
      return;
    }
    this.props.setDimensions(this.state.width, this.state.height);
    this.props.navigator.push({
      id : 'NewDesignPage',
      name: 'constructor'
    });
  }
}
