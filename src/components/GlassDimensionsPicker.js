import React, { Component } from 'react';
import {
  Text,
  View,
  Picker,
  Alert
} from 'react-native';
import styles from '../style/GlassDimensionsPickerStyle';
import config from '../config/GlassDimensionsConfig';
import Button from './Button';
import { showAlert } from '../services/AlertService';


const PickerItem = Picker.Item;
const ALERTS = {
  NOT_SELECTED_DIMENSIONS: {
    title: 'Dimensions are not selected!', 
    message: 'Please, choose width and height of your Dream Glass from the select boxes.', 
    buttons: [ {text: 'GOT IT!'} ]
  }
};

export default class GlassDimensionsPicker extends Component {
  constructor(props){
    super(props);

    this.state = {
      width: '',
      height: '',
      buttonText: 'CONFIRM'
    };

    this.confirmButtonPress = this.confirmButtonPress.bind(this);
  }

  getWidthDimensionPickerValues(){
    return config.width.map((el, index) => {
      return (
        <PickerItem value = { el } 
                     label = { el } 
                     key = { 'width' + index }
        />
      );
    });
  }
  getHeightDimensionPickerValues(){
    return config.height.map((el, index) => {
      return (
        <PickerItem value = {el} 
                     label = { el } 
                     key = { 'height' + index }
        />
      );
    });
  }

  render(){
    return (
      <View>
        <View style = { styles.dimensionsContainer }>
          <Picker style = { styles.dimensionPicker }
                  mode = { 'dropdown' }
                  selectedValue = { this.state.width }
                  onValueChange = { (width) => this.setState({ width}) }
          >
              { this.getWidthDimensionPickerValues() }
          </Picker>
          <Picker style = { styles.dimensionPicker }
                  selectedValue = { this.state.height }
                  onValueChange={ (height) => this.setState({ height }) }
                  mode = { "dropdown" }
          >
              { this.getHeightDimensionPickerValues() }
          </Picker>
        </View>
        <Button buttonStyle = { styles.confirmButton } 
                onPress = { this.confirmButtonPress }
                textStyle = { styles.confirmButtonText }
        >
          { this.state.buttonText }
        </Button>
      </View>
    );
  }
  confirmButtonPress(){
    if (this.state.width === 'Width' || this.state.height === 'Height'){
      showAlert(ALERTS.NOT_SELECTED_DIMENSIONS);
      return;
    }
    this.setState({
      buttonText: 'LOADING...'
    });
    const { setDimensions, navigator } = this.props;
    setDimensions(this.state.width, this.state.height);
    setTimeout(() => {
      navigator.push({
        id : 'DesignPage'
      });
    },100);
  }
}
