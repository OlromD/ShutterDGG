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
} from 'react-native';

import BluetoothSerial from 'react-native-bluetooth-serial'
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
    Promise.all([
      BluetoothSerial.isEnabled(),
      BluetoothSerial.list()
    ])
    .then((values) => {
      const [ isEnabled, devices ] = values
      this.setState({ isEnabled, devices })
      if (!this.state.isEnabled){
        this._requestBluetoothActivation();
      }
    })
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
  _requestBluetoothActivation(){
    BluetoothSerial.enable()
    .then((res) => {
      this.setState({ isEnabled: res });
    })
    .catch((err) => alert(err))
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

  discoverUnpaired () {
    if (this.state.discovering) {
      return false
    } else {
      this.setState({ discovering: true })
      BluetoothSerial.discoverUnpairedDevices()
      .then((unpairedDevices) => {
        const devices = this.state.devices
        const deviceIds = devices.map((d) => d.id)
        unpairedDevices.forEach((device) => {
          if (deviceIds.indexOf(device.id) < 0) {
            devices.push(device)
          }
        })
        this.setState({ devices, discovering: false })
      })
    }
  }


  connect (device) {
    this.setState({ connecting: true })
    BluetoothSerial.connect(device.id)
    .then((res) => {
      alert(res.message)
      this.setState({ device, connected: true, connecting: false })
    })
    .catch((err) => {
      this.setState({connecting: false });
      alert(err);
    })
  }


  disconnect () {
    this.setState({ connected: false })
    BluetoothSerial.disconnect()
    .catch((err) => alert(err))
  }


  toggleConnect (value) {
    if (value === true && this.state.device) {
      this.connect(this.state.device)
    } else {
      this.disconnect()
    }
  }

  write (message) {
    if (!this.state.connected) {
      alert('You must connect to device first')
    }

    BluetoothSerial.write(message)
    .then((res) => {
      alert('Successfuly wrote to device')
      this.setState({ connected: true })
    })
    .catch((err) => alert(err))
  }

  sendDesignData(){
    const device = this.state.devices.filter(d => d.id == this.state.bluetoothDeviceAddress)[0];
    this.setState({device});
    const message = '0 ' + this.state.horizontalIndicators.join('') + ' ' + this.state.verticalIndicators.join('');
    if (!this.state.connected){
      this.connect(device);
    } else {
      this.write(message);
    }
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
      <Modal
        animationType={'fade'}
        transparent={true}
        visible={this.state.bluetoothModalVisibility}
        onRequestClose={() => alert('Bluetooth modal has been closed!')}
      >
        <View style={styles.bluetoothModalWrapper}>
          <View style={styles.bluetoothModalBody}>
            <Text style={styles.bluetoothModalTitle}>
              Choose the device
            </Text>

            {
              (this.state.devices.length || this.state.discovering)? (
                <View>

                  {(!this.state.discovering)?(
                    <Picker
                      selectedValue={this.state.bluetoothDeviceAddress}
                      style={styles.bluetoothModalPicker}
                      onValueChange={(val) => this.setState({bluetoothDeviceAddress : val, device: this.state.devices.filter(d => d.id == val)})}
                    >
                      {this.state.devices.map(d => <PickerItem label={d.name + ' <' + d.id + '>'} key={d.id} value={d.id}/>)}
                    </Picker>
                  ) : (
                    <Text style={styles.bluetoothModalDescriptionText}>Wait, please, while discovering...</Text>
                  )}
                </View>
              ): (<Text style={styles.bluetoothModalDescriptionText}>There are no available devices!</Text>)
            }
            <View style={styles.bluetoothModalControl}>

              <TouchableHighlight
                style={styles.bluetoothModalButton}
                onPress={() => this.discoverUnpaired.bind(this)()}
              >
                <Text style={styles.bluetoothModalButtonText}>{this.state.discovering? 'Discovering...': 'Discover'}</Text>
              </TouchableHighlight>
              <TouchableHighlight
                style={styles.bluetoothModalButton}
                onPress={() => this._setBluetoothModalVisibility.bind(this)(false)}
              >
                <Text style={styles.bluetoothModalButtonText}>Cancel</Text>
              </TouchableHighlight>
              {
                (this.state.device)?(
                  <TouchableHighlight
                    style={styles.bluetoothModalButton}
                    onPress={this.sendDesignData.bind(this)}
                  >
                    <Text style={styles.bluetoothModalButtonText}>{this.state.connecting? 'Connecting...': this.state.connected? 'Send': 'Connect'}</Text>
                  </TouchableHighlight>
                ) : null
              }
            </View>
          </View>
        </View>
      </Modal>
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
              <Image source={LOGO} style={{width: 160, resizeMode: 'stretch', height: 100}}/>
            </View>
            <View style={{flex: 1, flexDirection: 'row'}}>
              <View style={{flex: 1, flexDirection: 'column'}}>
                <View style={{flex: 2, justifyContent: 'flex-end', alignItems: 'center'}}>
                  <TouchableHighlight style={styles.editNewDesignButton}
                    onPress={this.editNewDesign.bind(this)}
                  >
                    <Text style={{color: '#fff', fontSize: 15, textAlign: 'center'}}>Edit New Design</Text>
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
      </View>
    );
  }

  _runAndStopButtonPress(){
    BluetoothSerial.isEnabled()
      .then((val) => {
        this.setState({isEnabled: val});
        if (!val){
          Alert.alert('Bluetooth is not activated!', 'For using dream glass you have to activate your bluetooth module.',[
            {
              text: 'Close'
            },
            {
              text: 'Activate',
              onPress: () => this._requestBluetoothActivation.bind(this)()
            }
          ]);
        } else {
          this._setBluetoothModalVisibility.bind(this)(true);
        }
      })
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
