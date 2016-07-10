/*
  DesignPage.js
  This is page
  with constructor' grid
  of new user design
*/

import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Dimensions,
  Picker,
  Switch,
  Image
} from 'react-native';
import styles from '../../style/DesignPageStyle';
import modalStyles from '../../style/NewDesignPageModalStyle';
import config from '../../config/NewDesignConfig';

const PickerItem = Picker.Item;

export default class DesignPage extends Component {
  componentWillMount(){
    this.state = {
      modalVisible : false,
      animationType : "Up > Downward",
      timeSequence : '0.5',
      toggleDesign : false,
      repetitionCycle : '2'
    }
  }
  _setModalVisibility(value){
    this.setState({modalVisible : value});
  }

  _getTimeSequencePickerItems(){
      return config.timeSequence.map((el) => <PickerItem label={el} value={el} key={el} />);
  }
  _getMovingSequencePickerItems(){
    return config.movingSequence.map((el) => <PickerItem label={el} value={el} key={el} />);
  }
  _getRepetitionCyclePickerItems(){
    return config.repetitionCycle.map((el) => <PickerItem label={el} value={el} key={el} />);
  }


  render(){
    return (
      <View style={styles.container}>
        <Modal
          animationType={"slide"}
          visible={this.state.modalVisible}
          transparent={true}
          onRequestClose={() => {alert("Modal has been closed.")}}
        >
          <View style={modalStyles.wrapper}>
            <View style={modalStyles.contentContainer}>
              <Text style={modalStyles.title}>New design properties</Text>
              <View style={modalStyles.propContainer}>
                <Text style={modalStyles.propLabel}>Moving sequence</Text>
                <Picker
                  style={modalStyles.animationTypePicker}
                  selectedValue={this.state.animationType}
                  onValueChange={(type) => this.setState({animationType: type})}>
                    { this._getMovingSequencePickerItems() }
                </Picker>
              </View>
              <View style={[modalStyles.propContainer, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                <Text style={modalStyles.propLabel}>Toggling design</Text>
                <Switch
                  value={ this.state.toggleDesign }
                  onValueChange={ () => { this.setState({toggleDesign: !this.state.toggleDesign }) } }
                />
              </View>
              <View style={[modalStyles.propContainer, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                <Text style={modalStyles.propLabel}>Time sequence</Text>
                <Picker
                  style={modalStyles.timeSequencePicker}
                  selectedValue={this.state.timeSequence}
                  onValueChange={(time) => this.setState({timeSequence: time})}
                >
                  { this._getTimeSequencePickerItems() }
                </Picker>
              </View>
              <View style={[modalStyles.propContainer, {flexDirection: 'row', justifyContent: 'space-between'}]}>
                <Text style={modalStyles.propLabel}>Repetition cycle</Text>
                <Picker
                  style={modalStyles.repetitionCycle}
                  selectedValue={this.state.repetitionCycle}
                  onValueChange={(value) => this.setState({repetitionCycle: value})}
                >
                  { this._getRepetitionCyclePickerItems() }
                </Picker>
              </View>
              <View style={{alignItems: 'center'}}>
                <TouchableHighlight onPress={() => this._setModalVisibility(false)} style={modalStyles.closeButton}>
                  <Text style={modalStyles.closeButtonText}>Close</Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </Modal>
        <View style={styles.constructorContainer}>
          <View style={styles.constructor}>
          </View>
          <View style={styles.controlPanel}>
            <View style={[styles.joystick,]}>
              <TouchableHighlight
                style={styles.joystickDirectionButton}
              >
                <Text style={styles.joystickDirectionButtonText}>&and;</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.joystickOKButton}
              >
                <Text style={styles.joystickOKButtonText}>OK</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.joystickDirectionButton}
              >
                <Text style={styles.joystickDirectionButtonText}>&or;</Text>
              </TouchableHighlight>
            </View>
            <View style={styles.logoContainer}>
              <TouchableHighlight
                onPress={ () => this._setModalVisibility(true)}
                style={styles.openPropsButton}
              >
                <Text style={ styles.openPropsButtonText }>Properties</Text>
              </TouchableHighlight>
              <Image
                source={require('./mainpagelogo.png')}
                style={styles.controlPanelLogo}
              />
            </View>
            <View style={[styles.joystick, {flexDirection: 'row'}]}>
              <TouchableHighlight
                style={styles.joystickDirectionButton}
              >
                <Text style={styles.joystickDirectionButtonText}>&lt;</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.joystickOKButton}
              >
                <Text style={styles.joystickOKButtonText}>OK</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.joystickDirectionButton}
              >
                <Text style={styles.joystickDirectionButtonText}>&gt;</Text>
              </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
  onActionSelected( position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }
}
