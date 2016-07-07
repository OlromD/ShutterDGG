import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  TouchableHighlight
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
    const data = config.width;
    data.unshift('Width');
    return data.map((el, index) => <Picker.Item value={el} label={el} key={'width' + index}/>);
  }
  _getHeightDimensionPickerValues(){
    const data = config.height;
    data.unshift('Height');
    return data.map((el, index) => <Picker.Item value={el} label={el} key={'height' + index}/>);
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
        <TouchableHighlight style={styles.confirmButton} >
          <Text style={styles.confirmButtonText}>CONFIRM</Text>
        </TouchableHighlight>
      </View>
    );
  }
}
