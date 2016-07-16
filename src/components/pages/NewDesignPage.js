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

function arrayRowFactory(length){
  const arr = [];
  for (let i = 0; i< length; i++)
    arr.push(0);
  return arr;
}

function arrayFactory(length){
  const arr = [];
  for (let i = 0; i< length; i++)
    arr.push(i);
  return arr;
}

const PickerItem = Picker.Item;
let rows,
      cols,
      cellSize;

export default class DesignPage extends Component {
  componentWillMount(){
    rows = this.props.height / 5;
    cols =  this.props.width / 5;
    cellSize = Math.ceil((Dimensions.get('window').width*3/5 - 20) / (Math.max(cols, rows) + 1));
    this.state = {
      modalVisible : false,
      animationType : "Up > Downward",
      timeSequence : '0.5',
      toggleDesign : false,
      repetitionCycle : '2',
      verticalIndex : -1,
      horizontalIndex: 0,
      verticalIndicators: arrayRowFactory(rows),
      horizontalIndicators: arrayRowFactory(cols),
      showConfigPanel: false,
      showSelectedDesignsPanel: false,
      showAllDesignsPanel: false,
      selectedDesigns: config.selectedDesigns,
      allDesigns: arrayFactory(100)
    }
  }
  componentDidMount(){
  }
  _setModalVisibility(value){
    this.setState({modalVisible : value});
  }

  _getTimeSequenceTableItems(){
      return config.timeSequence.map((el) => (
        <TouchableHighlight style={styles.panelPropTableItem} key={el}>
          <Text style={styles.panelPropTableItemText} key={el}>{el}</Text>
        </TouchableHighlight>
      ));
  }
  _getMovingSequenceListItems(){
    return config.movingSequence.map((el) => (
      <TouchableHighlight style={styles.panelPropListItem} key={el}>
        <Text style={styles.panelPropListItemText} key={el}>{el}</Text>
      </TouchableHighlight>)
  );
  }
  _getRepetitionCycleTableItems(){
    return config.repetitionCycle.map((el) => (
      <TouchableHighlight style={styles.panelPropTableItem} key={'interval'+el}>
        <Text style={styles.panelPropTableItemText} key={'interval'+el}>{el}</Text>
      </TouchableHighlight>
    ));
  }
  _getIntervalTimeTableItems(){
    return config.intervalTime.map((el) => (
      <TouchableHighlight style={styles.panelPropTableItem} key={el}>
        <Text style={styles.panelPropTableItemText} key={el}>{el}</Text>
      </TouchableHighlight>
    ));
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
          <Text key={i} style={{textAlign: 'center', fontSize: cellSize*.6}}>{indicators[i]}</Text>
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
          <Text key={i} style={{textAlign: 'center', fontSize: cellSize*.6}}>{indicators[i]}</Text>
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

  _hideAllPanels(){
    this.setState({
      showConfigPanel: false,
      showSelectedDesignsPanel: false,
      showAllDesignsPanel: false
    });
  }
  _setConfigPanelVisibility(value){
    this._hideAllPanels();
    this.setState({
      showConfigPanel: value
    });
  }
  _showSelectedDesignsPanelVisibility(value){
    this._hideAllPanels();
    this.setState({
      showSelectedDesignsPanel: value
    });
  }
  _showAllDesignsPanelVisibility(value){
    this._hideAllPanels();
    this.setState({
      showAllDesignsPanel: value
    });
  }

  _getAllDesignsTable(){
    return this.state.allDesigns.map((el, index) => (
      <TouchableHighlight style={styles.panelPropTableDesignItem} key={index}>
        <Text style={styles.panelPropTableItemText} key={index}>{((el < 10)?'0': '') + el}</Text>
      </TouchableHighlight>
    ));
  }

  _getSelectedDesignsTable(){
    return this.state.selectedDesigns.map((el, index) => (
      <TouchableHighlight style={styles.panelPropTableItem} key={'selected' + index}>
        <Text style={styles.panelPropTableItemText} key={'selected' + index}>{((el < 10)?'0': '') + el}</Text>
      </TouchableHighlight>
    ));
  }

  render(){

    const configPanel = (
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <TouchableHighlight style={styles.buttonRounded} onPress={() => this._setConfigPanelVisibility.bind(this)(false)}>
            <Text style={styles.buttonRoundedText}>&or;</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={[styles.panelTitleText, {width: 500, marginLeft: 20}]}>Movement & Time Sequence of a Single Design</Text>
          </View>
          <View style={styles.panelPropsContainer}>
            <View style={styles.panelPropTitle}>
              <Text style={styles.titleCaret}>&or;</Text>
              <Text style={styles.panelPropTitleText}>Moving Sequences</Text>
            </View>
            <View style={styles.panelPropList}>
              { this._getMovingSequenceListItems() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={styles.titleCaret}>&or;</Text>
              <Text style={styles.panelPropTitleText}>Time Sequences (Second)</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getTimeSequenceTableItems() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={styles.titleCaret}>&or;</Text>
              <Text style={styles.panelPropTitleText}>Repetition Cycle in Single Design</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getRepetitionCycleTableItems() }
            </View>
          </View>
        </View>
      </View>
    ),
    selectedDesignsPanel = (
      <View style={[styles.panel, {height: 500, flex: 0}]}>
        <View style={styles.panelHeader}>
          <TouchableHighlight style={styles.buttonRounded}
            onPress={() => this._showSelectedDesignsPanelVisibility.bind(this)(false)}
          >
            <Text style={styles.buttonRoundedText}>&or;</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.panelBody}>
          <View style={styles.panelTitle}>
            <Text style={[styles.panelTitleText, {width: 300, marginLeft: -3}]}>Movement & Time Sequence in Multiple Designs</Text>
          </View>
          <View style={styles.panelPropsContainer}>
            <View style={styles.panelPropTitle}>
              <Text style={[styles.titleCaret, {width: 40}]}>&or;</Text>
              <Text style={[styles.panelPropTitleText, {fontSize: 20}]}>Choose/Change up to 12 designs</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getSelectedDesignsTable() }
            </View>
            <View style={styles.panelPropTitle}>
              <Text style={[styles.titleCaret, {width: 40}]}>&or;</Text>
              <Text style={[styles.panelPropTitleText, {fontSize: 20}]}>Interval Time within Designs in Second(s)</Text>
            </View>
            <View style={styles.panelPropTable}>
              { this._getIntervalTimeTableItems() }
            </View>
          </View>
        </View>
      </View>
    ),
    allDesignsPanel = (
      <View style={styles.panel}>
        <View style={styles.panelHeader}>
          <TouchableHighlight style={styles.buttonRounded} onPress={() => this._showAllDesignsPanelVisibility.bind(this)(false)}>
            <Text style={styles.buttonRoundedText}>&or;</Text>
          </TouchableHighlight>
        </View>
        <View style={styles.panelBody}>
          <View style={styles.panelPropsContainer}>
            <View style={styles.panelPropTitle}>
              <Text style={styles.titleCaret}>&or;</Text>
              <Text style={styles.panelPropTitleText}>Designs List</Text>
            </View>
            <View style={styles.panelPropDesignsTable}>
              { this._getAllDesignsTable() }
            </View>
          </View>
        </View>
      </View>
    );
    return (
      <View style={styles.container}>


        <View style={styles.constructorContainer}>
          <View style={styles.constructor}>
            <View style={styles.propsPanel}>
              { this.state.showConfigPanel && configPanel}
              { this.state.showSelectedDesignsPanel && selectedDesignsPanel}
              { this.state.showAllDesignsPanel && allDesignsPanel}
            </View>
            <View style={styles.grid}>
              <View style={styles.gridContainer}>
                <View style={{flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                  <View style={[styles.horizontalIndicatorsContainer, {alignItems: 'center', justifyContent: 'center'}]}>
                    { this._getHorizontalGridIndicators() }
                  </View>
                  <View style={{/*backgroundColor: 'green',*/ flexDirection: 'column', alignItems: 'center', justifyContent: 'center'}}>
                    { this._getGrid() }
                  </View>
                </View>

                <View style={[styles.vertivalIndicatorsContainer, {marginTop: cellSize}]}>
                  { this._getVerticalGridIndicators() }
                </View>
              </View>
            </View>
          </View>
          <View style={styles.controlPanel}>
            <View style={styles.leftControlPanel}>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => this._setConfigPanelVisibility(true)}
              >
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Movement & Time Sequence of a Single Design</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => this._showAllDesignsPanelVisibility.bind(this)(true)}
              >
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Designs List with or without Motion</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => {this._showSelectedDesignsPanelVisibility.bind(this)(true)}}
              >
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Movement & Time Sequence of Multiple Designs</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => {this._showSelectedDesignsPanelVisibility.bind(this)(true)}}
              >
                <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Choose/Change block of 2-12 designs</Text>
              </TouchableHighlight>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', width: 160}}>
              <Image source={require('./mainpagelogo.png')} style={{width: 160, resizeMode: 'stretch', height: 100}}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                  <TouchableHighlight style={styles.editNewDesignButton}>
                    <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Edit New Design</Text>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableHighlight style={styles.rightPanelActionButton}>
                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>Save & Load</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.rightPanelActionButton}>
                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>RUN & STOP</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableHighlight style={styles.joystickDirectionButton}
                    onPress={this._moveUp.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&and;</Text>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center'}}>
                  <TouchableHighlight style={styles.joystickDirectionButton}
                    onPress={this._moveLeft.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&lt;</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={[styles.joystickDirectionButton, {backgroundColor: 'transparent'}]}
                    onPress={this._OKButtonPress.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>OK</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.joystickDirectionButton}
                    onPress={this._moveRight.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&gt;</Text>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 1, flexDirection: 'row', justifyContent: 'center', alignItems: 'center'}}>
                  <TouchableHighlight style={styles.joystickDirectionButton}
                    onPress={this._moveDown.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 24, textAlign: 'center'}}>&or;</Text>
                  </TouchableHighlight>
                </View>

              </View>
            </View>
          </View>
        </View>
      </View>
    );
  }


  _OKButtonPress(){
    const hIndex = this.state.horizontalIndex;
    if (hIndex === -1)
      this._changeVerticalIndicatorValue()
    else
      this._changeHorizontalIndicatorValue();
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
    if (index === 0){
      this.setState({
        horizontalIndex: cols -1,
        verticalIndex: -1
      });
    }
    if (index > 0){
      this.setState({
        verticalIndex : index - 1
      });
    }
  }
  _moveDown(){
    const index = this.state.verticalIndex;
    const hIndex = this.state.horizontalIndex;
    if (hIndex === cols -1){
      this.setState({
        verticalIndex: 0,
        horizontalIndex: -1
      });
    } else
    if (index < rows - 1 && index !== -1){
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
    if (index < cols - 1 && index !== -1){
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
