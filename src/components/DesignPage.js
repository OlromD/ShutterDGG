import React, {Component} from 'react';
import {
  View,
  Text,
  Modal,
  TouchableHighlight,
  Dimensions,
  Picker,
  Switch,
  Image,
  Alert,
  AsyncStorage,
  StyleSheet
} from 'react-native';

import GlassGrid from './grid/GlassGrid';

import styles from '../style/DesignPageStyle';
import modalStyles from '../style/DesignPageModalStyle';
import config from '../config/DesignConfig';
import { LOGO } from '../config/ApplicationConfig';
import { STANDARD_DESIGNS } from '../config/StandardDesignsConfig';
import DesignSettingsPanel from './panels/DesignSettingsPanel';
import SelectedDesignsPanel from './panels/SelectedDesignsPanel';
import AllDesignsPanel from './panels/AllDesignsPanel';
import { Design, DESIGN_INDICATOR_TYPES, toggleDesignIndicator }  from '../models/Design';
import Joystick from './Joystick';
import SendingDataToDeviceModal from '../modals/SendingDataToDeviceModal';


function arrayRowFactory(length, value = 0) {
  return new Array(length).fill(value);
}

function id(width, height) {
 return `Glass${width}x${height}`;
}

const PickerItem = Picker.Item;
let rows,
    cols,
    cellSize,
    design;

export default class DesignPage extends Component {
  constructor(props){
    super(props);

    this.sendingDataToDeviceModalOnClose = this.sendingDataToDeviceModalOnClose.bind(this);
    this.getDataForSendingToDevice = this.getDataForSendingToDevice.bind(this);
  }
  componentWillMount(){

    const PADDING = 100;
    const CELL_DIMENSION = 5;

    rows = this.props.height / CELL_DIMENSION;
    cols =  this.props.width / CELL_DIMENSION;


    cellSize = Math.ceil((Dimensions.get('window').width - PADDING) / (Math.max(cols, rows) + 1));
    this.prepareGlassData(this.props.width, this.props.height);
    design  = new Design({
      horizontal : arrayRowFactory(cols),
      vertical : arrayRowFactory(rows),
    },
    config.movingSequence[0],
    config.repetitionCycle[0],
    config.timeSequence[0]
    );

    this.state = {
      verticalIndex : -1,
      horizontalIndex: 0,
      currentDesign : new Design( { horizontal : arrayRowFactory(cols), vertical : arrayRowFactory(rows), },
        config.movingSequence[0],
        config.repetitionCycle[0],
        config.timeSequence[0]
      ),
      showConfigPanel: false,
      showSelectedDesignsPanel: false,
      showAllDesignsPanel: false,
      sendingDataToDeviceModalVisible: false,
      bluetoothModalVisibility : false,
      bluetoothDeviceAddress : null,
      allDesigns: [],
      selectedDesigns: [],
      devices : [],
      activeDesignFromAll : null,
      activeDesignFromSelected : null,
      intervalTime : config.intervalTime[0]
    }

  }
  componentDidMount(){
    
  }

  prepareGlassData(){
    const { width, height } = this.props;
    AsyncStorage.getItem(id(width, height))
      .then(value => {
        let all,
            selected;
        if (value === null){
          const MAX_SELECTED_DESIGN_NUMBER = 12;
          const MAX_DESIGN_NUMBER = 100;

          selected = arrayRowFactory(MAX_SELECTED_DESIGN_NUMBER, null);
          all = arrayRowFactory(MAX_DESIGN_NUMBER, null);
          
          const supportStandardDesign = width === '150' && height === '300';
          if (supportStandardDesign){
            selected = arrayRowFactory(MAX_SELECTED_DESIGN_NUMBER, null);
            all = STANDARD_DESIGNS.concat(arrayRowFactory(MAX_DESIGN_NUMBER - STANDARD_DESIGNS.length, null));
          }
        } else {
          selected = JSON.parse(value).selectedDesigns;
          all = JSON.parse(value).allDesigns;
        }
        this.setState({
          allDesigns: all,
          selectedDesigns: selected
        });
      }).done();
  }
  saveGlassData(){
    const { width, height } = this.props;
    AsyncStorage.setItem(id(width, height), JSON.stringify(
      {
        allDesigns: this.state.allDesigns,
        selectedDesigns: this.state.selectedDesigns
      }
    ));
  }

  initNewDesign(){
    this.saveGlassData();
    this.setState({
      verticalIndex : -1,
      horizontalIndex: 0,
      currentDesign : new Design( { horizontal : arrayRowFactory(cols), vertical : arrayRowFactory(rows), },
        config.movingSequence[0],
        config.repetitionCycle[0],
        config.timeSequence[0]
      ),
      showConfigPanel: false,
      showSelectedDesignsPanel: false,
      showAllDesignsPanel: false,
      activeDesignFromAll : null,
      activeDesignFromSelected : null,
      intervalTime : config.intervalTime[0]
    });
  }

  saveDesign(){
    let designs = this.state.allDesigns;
    const index = designs.indexOf(null);
    designs[index] = Object.assign({}, this.state.currentDesign);
    this.setState({
      allDesigns: designs,
      activeDesignFromAll : index
    });
    this.saveGlassData();
    Alert.alert('Your design has been saved!', 'Do you want to create new design or stay on this one?', [
      {
        text: 'CLOSE'
      },
      {
        text: 'NEW DESIGN',
        onPress : this.initNewDesign.bind(this)
      }
    ]);
  }
  editNewDesign(){
    Alert.alert('Edit new design', 'Do you want to save current design?', [
      {
        text: 'YES',
        onPress: this.saveDesign.bind(this)
      },
      {
        text: 'NO',
        onPress : this.initNewDesign.bind(this)
      }
    ]);
  }

  _setModalVisibility(value){
    this.setState({modalVisible : value});
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


  _setBluetoothModalVisibility(value){
    if (!value && this.state.connected){
      this.disconnect();
    }
    this.setState({
      bluetoothModalVisibility : value
    });
  }

  deleteDesignFromAll(designs){
    this.setState({
      allDesigns : designs,
      activeDesignFromAll : null
    });
    this.saveGlassData();
  }
  deleteDesignsFromSelected(designs){
    this.setState({
      selectedDesigns: designs,
      activeDesignFromSelected: null
    });
    this.saveGlassData();
  }

  moveDesignToSelected(){
    let index = this.state.activeDesignFromAll,
        designs = this.state.selectedDesigns;
    if (index === null)
      return;
    if (designs.indexOf(null) === -1){
      Alert.alert(
        'Oops...',
        'You are able to add only 12 designs to selected. Remove one from selected and try again.',
        [
          {
            text: 'GOT IT!'
          }
        ]
      );
      return;
    }
    if (designs.indexOf(''+index) !== -1){
      Alert.alert(
        'Oops...',
        `This design exists in list of selected designs. You can't add it twice!`,
        [
          {
            text: 'GOT IT!'
          }
        ]
      );
      return;
    }
    designs[designs.indexOf(null)] = index;
    this.setState({
      selectedDesigns: designs,
    });
    Alert.alert(
      'Congratulations!',
      `Design ${index} has been successfuly added to selected designs.`,
      [
        {
          text: 'OK'
        }
      ]
    );
    this.saveGlassData();
  }


  setActiveDesignFromSelected(index){
    this.setState({ activeDesignFromSelected : index })
  }
  onAllDesignsItemPress(index){
    const designs = this.state.allDesigns;
    this.setState({
      activeDesignFromAll : index,
      currentDesign : Object.assign({}, designs[index]),
      verticalIndex : -1,
      horizontalIndex : 0
    })
  }
  render(){
    return (
      <View style={styles.container}>
        <View style={styles.constructorContainer}>
          <View style={styles.constructor}>
            <GlassGrid
              rows={rows}
              cols={cols}
              design = { this.state.currentDesign }
              verticalIndex={this.state.verticalIndex}
              horizontalIndex={this.state.horizontalIndex}
              cellSize={cellSize}
            />
            <View style={styles.propsPanel}>
              <DesignSettingsPanel
                visible = { this.state.showConfigPanel }
                onClose = { () => this._setConfigPanelVisibility.bind(this)(false) }
                onDesignChange = { design => this.setState({ currentDesign : design})}
                design = { this.state.currentDesign }
              />
              <SelectedDesignsPanel
                visible = { this.state.showSelectedDesignsPanel }
                onClose = { () => this._showSelectedDesignsPanelVisibility.bind(this)(false)}
                onDesignItemPress = { index => this.setState({ activeDesignFromSelected : index}) }
                designs = { this.state.selectedDesigns }
                onDesignItemDelete = { this.deleteDesignsFromSelected.bind(this) }
                active = { this.state.activeDesignFromSelected }
              />
              <AllDesignsPanel
                onClose = { () => this._showAllDesignsPanelVisibility.bind(this)(false) }
                active = { this.state.activeDesignFromAll }
                designs = { this.state.allDesigns }
                onDesignItemPress = { this.onAllDesignsItemPress.bind(this) }
                visible = { this.state.showAllDesignsPanel }
                onDesignItemSelect = { this.moveDesignToSelected.bind(this) }
                onDesignItemDelete = { this.deleteDesignFromAll.bind(this) }
              />
            </View>
          </View>
          <View style={styles.controlPanel}>
            <View style={styles.leftControlPanel}>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => this._setConfigPanelVisibility(true)}
              >
                <Text style={panelStyles.actionButtonText}>Movement & Time Sequence of a Single Design</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => this._showAllDesignsPanelVisibility.bind(this)(true)}
              >
                <Text style={panelStyles.actionButtonText}>Designs List with or without Motion</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => {this._showSelectedDesignsPanelVisibility.bind(this)(true)}}
              >
                <Text style={panelStyles.actionButtonText}>Movement & Time Sequence of Multiple Designs</Text>
              </TouchableHighlight>
              <TouchableHighlight style={styles.leftControlPanelButton}
                onPress={() => {this._showSelectedDesignsPanelVisibility.bind(this)(true)}}
              >
                <Text style={panelStyles.actionButtonText}>Choose/Change block of 2-12 designs</Text>
              </TouchableHighlight>
            </View>
            <View style={{justifyContent: 'center', alignItems: 'center', width: 160}}>
              <Image source={LOGO} style={{width: 160, resizeMode: 'stretch', height: 100}}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                  <TouchableHighlight style={styles.editNewDesignButton}
                    onPress={this.editNewDesign.bind(this)}
                  >
                    <Text style={panelStyles.actionButtonText}>Edit New Design</Text>
                  </TouchableHighlight>
                </View>
                <View style={{flex: 3, flexDirection: 'row', justifyContent: 'center'}}>
                  <TouchableHighlight style={styles.rightPanelActionButton}
                    onPress={this.saveDesign.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>Save & Load</Text>
                  </TouchableHighlight>
                  <TouchableHighlight style={styles.rightPanelActionButton}
                    onPress={this._runAndStopButtonPress.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 18, textAlign: 'center'}}>RUN & STOP</Text>
                  </TouchableHighlight>
                </View>
              </View>
              <Joystick
                onUpButtonPress = { this._moveUp.bind(this) }
                onDownButtonPress = { this._moveDown.bind(this) }
                onLeftButtonPress = { this._moveLeft.bind(this) }
                onRightButtonPress = { this._moveRight.bind(this) }
                onOKButtonPress = { this._OKButtonPress.bind(this) }
              />
            </View>
          </View>
        </View>
        <SendingDataToDeviceModal
          visible = { this.state.sendingDataToDeviceModalVisible } 
          onClose = { this.sendingDataToDeviceModalOnClose }
          data = { this.getDataForSendingToDevice() }
        />
      </View>
    );
  }

  getDataForSendingToDevice(){
    const { width, height } = this.props;
    const { horizontal, vertical } = this.state.currentDesign.indicators;
    const hI = this.transformIndicatorsDataToSpecificFormat(horizontal.join('')),
          wI = this.transformIndicatorsDataToSpecificFormat(vertical.join(''));
    return `${wI} ${hI}`;
    // return `128`;
  }

  // adapter
  transformIndicatorsDataToSpecificFormat(indicators){
    let result = '';
    const bitPortion = 3;
    for (let i = 0; i < indicators.length; i += bitPortion){
      result += parseInt(indicators.substr(i, bitPortion), 2);
      // result += i % 2 === 1? '0':'';
    }
    return result;
  }
  // adapter

  _runAndStopButtonPress(){
    this.setState({
      sendingDataToDeviceModalVisible: true
    });
  }

  sendingDataToDeviceModalOnClose(){
    this.setState({
      sendingDataToDeviceModalVisible: false
    });
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
    let design = this.state.currentDesign;
    toggleDesignIndicator(design, DESIGN_INDICATOR_TYPES.VERTICAL, index);
    this.setState({
      currentDesign : design
    });
  }
  _changeHorizontalIndicatorValue(){
    const index = this.state.horizontalIndex;
    let design = this.state.currentDesign;
    toggleDesignIndicator(design, DESIGN_INDICATOR_TYPES.HORIZONTAL, index);
    this.setState({
      currentDesign : design
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
}


const panelStyles = StyleSheet.create({
  actionButtonText: {
    color: '#fff', 
    fontSize: 15, 
    textAlign: 'center'
  }
});