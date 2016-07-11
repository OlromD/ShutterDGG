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

function arrayFactory(length){
  const arr = [];
  for (let i = 0; i< length; i++)
    arr.push(0);
  return arr;
}

const PickerItem = Picker.Item;
const rows = 60 / 5,
      cols =  30 / 5,
      cellSize = Math.ceil((Dimensions.get('screen').width - 20) / (Math.max(cols, rows) + 1));

export default class DesignPage extends Component {
  componentWillMount(){
    this.state = {
      modalVisible : false,
      animationType : "Up > Downward",
      timeSequence : '0.5',
      toggleDesign : false,
      repetitionCycle : '2',
      verticalIndex : 0,
      horizontalIndex: 0,
      verticalIndicators: arrayFactory(rows),
      horizontalIndicators: arrayFactory(cols)
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

  _saveDesign(){
    this.props.navigator.push({
      id: 'AllDesignsPage'
    });
  }

  _getHorizontalGridIndicators(){
    let res = [];
    const index = this.state.horizontalIndex,
          indicators = this.state.horizontalIndicators;
    for (let i = 0; i < cols; i++){
      res.push(
        <View key={i} style={[styles.gridIndicator, {width: cellSize, height: cellSize, backgroundColor: (index === i)?'orange': 'yellow'}]}>
          <Text key={i} style={{textAlign: 'center', fontSize: 12}}>{indicators[i]}</Text>
        </View>);
    }
    return res;
  }
  _getVerticalGridIndicators(){
    let res = [];
    const index = this.state.verticalIndex,
          indicators = this.state.verticalIndicators;
    for (let i = 0; i < rows; i++){
      res.push(
        <View key={i} style={[styles.gridIndicator, {width: cellSize, height: cellSize, backgroundColor: (index === i)?'orange': 'yellow'}]}>
          <Text key={i} style={{textAlign: 'center', fontSize: 12}}>{indicators[i]}</Text>
        </View>);
    }
    return res;
  }
  _getGridRow(row){
    let res = [];
    const horizontalIndicators = this.state.horizontalIndicators,
          verticalIndicators = this.state.verticalIndicators;
    for (let i = 0; i < cols; i++)
      res.push(
        <View key={i} style={[styles.gridCell, {width: cellSize, height: cellSize, backgroundColor: ((horizontalIndicators[i] !== verticalIndicators[row])?'#fff':'#ccc')}]}>
        </View>
      );
    return res;
  }
  _getGrid(){
    let res = [];
    for (let i = 0; i < rows; i++){
      res.push(<View style={{flexDirection: 'row'}} key={i}>{this._getGridRow(i)}</View>);
    }
    return res;
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
            <View style={styles.gridContainer}>
              <View style={{flexDirection: 'column'}}>
                <View style={styles.horizontalIndicatorsContainer}>
                  { this._getHorizontalGridIndicators() }
                </View>
                <View style={{flex: 1, /*backgroundColor: 'green',*/ flexDirection: 'column'}}>
                  { this._getGrid() }
                </View>
              </View>

              <View style={[styles.vertivalIndicatorsContainer, {marginTop: cellSize}]}>
                { this._getVerticalGridIndicators() }
              </View>
            </View>
          </View>
          <View style={styles.controlPanel}>
            <View style={[styles.joystick,]}>
              <TouchableHighlight
                style={styles.joystickDirectionButton}
                onPress={this._moveUp.bind(this)}
              >
                <Text style={styles.joystickDirectionButtonText}>&and;</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this._changeVerticalIndicatorValue.bind(this)}
                style={styles.joystickOKButton}
              >
                <Text style={styles.joystickOKButtonText}>OK</Text>
              </TouchableHighlight>
              <TouchableHighlight
                onPress={this._moveDown.bind(this)}
                style={styles.joystickDirectionButton}
              >
                <Text style={styles.joystickDirectionButtonText}>&or;</Text>
              </TouchableHighlight>
            </View>

            <View style={[styles.joystick, {flexDirection :'column'}]}>
              <View style={ {flexDirection: 'row', justifyContent: 'center', alignItems: 'center', marginBottom: 10}}>
                  <TouchableHighlight
                    onPress={this._moveLeft.bind(this)}
                    style={styles.joystickDirectionButton}
                  >
                    <Text style={styles.joystickDirectionButtonText}>&lt;</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={this._changeHorizontalIndicatorValue.bind(this)}
                    style={styles.joystickOKButton}
                  >
                    <Text style={styles.joystickOKButtonText}>OK</Text>
                  </TouchableHighlight>
                  <TouchableHighlight
                    onPress={this._moveRight.bind(this)}
                    style={styles.joystickDirectionButton}
                  >
                    <Text style={styles.joystickDirectionButtonText}>&gt;</Text>
                  </TouchableHighlight>
              </View>
              <View style={{flexDirection: 'row'}}>
                <TouchableHighlight
                  onPress={ () => this._setModalVisibility(true)}
                  style={styles.openPropsButton}
                >
                  <Text style={ styles.openPropsButtonText }>Properties</Text>
                </TouchableHighlight>
                <TouchableHighlight
                  onPress={ this._saveDesign.bind(this)}
                  style={styles.saveButton}
                >
                  <Text style={ styles.saveButtonText }>Save</Text>
                </TouchableHighlight>
              </View>

            </View>
          </View>
        </View>
      </View>
    );
  }

  _changeVerticalIndicatorValue(){
    const index = this.state.verticalIndex;
    let indicators = [].concat(this.state.verticalIndicators);
    const val = indicators[index];
    indicators[index] = val === 0? 1: 0;
    this.setState({
      verticalIndicators : indicators
    });
  }
  _changeHorizontalIndicatorValue(){
    const index = this.state.horizontalIndex;
    let indicators = [].concat(this.state.horizontalIndicators);
    const val = indicators[index];
    indicators[index] = val === 0? 1: 0;
    this.setState({
      horizontalIndicators : indicators
    });
  }

  _moveUp(){
    const index = this.state.verticalIndex;
    if (index > 0){
      this.setState({
        verticalIndex : index - 1
      });
    }
  }
  _moveDown(){
    const index = this.state.verticalIndex;
    if (index < rows - 1){
      this.setState({
        verticalIndex : index + 1
      });
    }
  }

  _moveLeft(){
    const index = this.state.horizontalIndex;
    if (index > 0){
      this.setState({
        horizontalIndex : index - 1
      });
    }
  }
  _moveRight(){
    const index = this.state.horizontalIndex;
    if (index < cols - 1){
      this.setState({
        horizontalIndex : index + 1
      });
    }
  }


  onActionSelected( position) {
    if (position === 0) { // index of 'Settings'
      showSettings();
    }
  }
}
