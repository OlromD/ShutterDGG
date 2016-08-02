import React, { Component } from 'react';
import {
  View,
  TouchableHighlight,
  Text
} from 'react-native';
import styles from '../style/DesignPageStyle';

export default class Joystick extends Component {
  constructor(props){
    super(props);
  }

  render(){
    const { onUpButtonPress, onDownButtonPress, onLeftButtonPress, onRightButtonPress, onOKButtonPress } = this.props;
    return (
      <View style={{flex: 1, flexDirection: 'column'}}>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight style={styles.joystickDirectionButton}
            onPress = { onUpButtonPress }
          >
            <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&and;</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
          <TouchableHighlight style={styles.joystickDirectionButton}
            onPress = { onLeftButtonPress }
          >
            <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&lt;</Text>
          </TouchableHighlight>
          <TouchableHighlight style={[styles.joystickDirectionButton, {backgroundColor: 'transparent'}]}
            onPress = { onOKButtonPress }
          >
            <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>OK</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.joystickDirectionButton}
            onPress = { onRightButtonPress }
          >
            <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&gt;</Text>
          </TouchableHighlight>
        </View>
        <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
          <TouchableHighlight style={styles.joystickDirectionButton}
            onPress = { onDownButtonPress }
          >
            <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&or;</Text>
          </TouchableHighlight>
        </View>
      </View>
    );
  }
}
