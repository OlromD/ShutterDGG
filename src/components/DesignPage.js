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
import DesignSettingsPanel from './panels/DesignSettingsPanel';

function arrayRowFactory(length){
  const arr = [];
  for (let i = 0; i< length; i++)
    arr.push(0);
  return arr;
}

function arrayFactory(length, value = null){
  const arr = [];
  for (let i = 0; i< length; i++)
    arr.push(value);
  return arr;
}

const PickerItem = Picker.Item;
let rows,
    cols,
    cellSize;

export default class DesignPage extends Component {
  componentWillMount(){
    this.prepareGlassData(this.props.width, this.props.height);
    rows = this.props.height / 5;
    cols =  this.props.width / 5;
    cellSize = Math.ceil((Dimensions.get('window').width - 100) / (Math.max(cols, rows) + 1));
    this.prepareGlassData(this.props.width, this.props.height);

    this.state = {
      verticalIndex : -1,
      horizontalIndex: 0,
      verticalIndicators: arrayRowFactory(rows),
      horizontalIndicators: arrayRowFactory(cols),
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
      movingSequence : config.movingSequence[0],
      timeSequence : config.timeSequence[0],
      repetitionCycle : config.repetitionCycle[0],
      intervalTime : config.intervalTime[0]
    }
  }
  componentDidMount(){

    // Promise.all([
    //   BluetoothSerial.isEnabled(),
    //   BluetoothSerial.list()
    // ])
    // .then((values) => {
    //   const [ isEnabled, devices ] = values
    //   this.setState({ isEnabled, devices })
    //   if (!this.state.isEnabled){
    //     this._requestBluetoothActivation();
    //   }
    // })
  }

  prepareGlassData(){
    const { width, height } = this.props;
    AsyncStorage.getItem('Glass' + width + 'x' + height)
      .then(value => {
        let all,
            selected;
        if (value === null){
          selected = arrayFactory(12);
          all = arrayFactory(100);
          if (width == '150' && height == '300'){
            for (let i =0; i < 12; i++){
              selected[i] = i;
              all[i] = i;
            }
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
    AsyncStorage.setItem('Glass' + width + 'x' + height, JSON.stringify(
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
      verticalIndicators: arrayRowFactory(rows),
      horizontalIndicators: arrayRowFactory(cols),
      showConfigPanel: false,
      showSelectedDesignsPanel: false,
      showAllDesignsPanel: false,
      activeDesignFromAll : null,
      activeDesignFromSelected : null,
      movingSequence : config.movingSequence[0],
      timeSequence : config.timeSequence[0],
      repetitionCycle : config.repetitionCycle[0],
      intervalTime : config.intervalTime[0]
    });
  }

  saveDesign(){
    let designs = this.state.allDesigns;
    designs[designs.indexOf(null)] = designs.indexOf(null);
    this.setState({
      allDesigns: designs,
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


  _getIntervalTimeTableItems(){
    return config.intervalTime.map((el) => (
      <TouchableHighlight
        style={styles.panelPropTableItem}
        key={el}
        onPress={() => this.setState({intervalTime : el})}
      >
        <Text style={[styles.panelPropTableItemText, {color: (this.state.intervalTime === el)?'#68c6c8': '#999'}]} key={el}>{el}</Text>
      </TouchableHighlight>
    ));
  }
  _saveDesign(){
    this.props.navigator.push({
      id: 'AllDesignsPage'
    });
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
      <TouchableHighlight style={
          [
            styles.panelPropTableDesignItem,
            {
              backgroundColor: (el === null)? '#ccc': (this.state.activeDesignFromAll === index)?'#69c9c8':'#f3f4f8',
            }
          ]
        }
        key={index}
        onPress={() => {
          if (el !== null)
            this.setState({
              activeDesignFromAll : index
            })}
        }
      >
          <Text style={styles.panelPropTableItemText} key={index}>{(el === null)?'':((el < 10)?'0': '') + el}</Text>
      </TouchableHighlight>
    ));
  }

  _getSelectedDesignsTable(){
    return this.state.selectedDesigns.map((el, index) => (
      <TouchableHighlight
        style={[
          styles.panelPropTableItem,
          {
            backgroundColor: (el === null)? '#ccc': (this.state.activeDesignFromSelected === index)?'#69c9c8':'#f3f4f8',
          }
        ]}
        key={'selected' + index}
        onPress={() => {
          if (el !== null)
            this.setState({
              activeDesignFromSelected : index
            })}
        }
      >
        <Text style={styles.panelPropTableItemText} key={'selected' + index}>{(el === null)?'':((el < 10)?'0': '') + el}</Text>
      </TouchableHighlight>
    ));
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

  deleteDesignsFromAll(){
    let designs = this.state.allDesigns,
        index = this.state.activeDesignFromAll;
    if (index === null)
      return;
    Alert.alert(
      'Confirm deletion',
      'Do you want to delete this design?',
      [
        {
          text: 'NO'
        },
        {
          text: 'YES',
          onPress : () => {
            designs[index] = null;
            this.setState({
              allDesigns : designs,
              activeDesignFromAll : null
            });
            this.saveGlassData();
          }
        }
      ]
    );

  }
  deleteDesignsFromSelected(){
    let designs = this.state.selectedDesigns,
        index = this.state.activeDesignFromSelected;
    if (index === null)
      return;
    Alert.alert(
      'Confirm deletion',
      'Do you want to delete this design from selected designs?',
      [
        {
          text: 'NO'
        },
        {
          text: 'YES',
          onPress : () => {
            designs[index] = null;
            this.setState({
              selectedDesigns : designs,
              activeDesignFromSelected : null
            });
            this.saveGlassData();
          }
        }
      ]
    );
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
      activeDesignFromAll : null
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

  render(){

    const configPanel = DesignSettingsPanel,
    selectedDesignsPanel = (
      <View style={[styles.panel, {height: 500, flex: 0}]}>
        <View style={[styles.panelHeader, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <TouchableHighlight style={styles.buttonRectangle}
            onPress={() => this._showSelectedDesignsPanelVisibility.bind(this)(false)}
          >
            <Text style={styles.buttonRectangleText}>&or;</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonRectangle} onPress={this.deleteDesignsFromSelected.bind(this)}>
            <Text style={styles.buttonRectangleText}>&#10005;</Text>
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
        <View style={[styles.panelHeader, {flexDirection: 'row', justifyContent: 'space-between'}]}>
          <TouchableHighlight style={styles.buttonRectangle} onPress={this.moveDesignToSelected.bind(this)}>
            <Text style={styles.buttonRectangleText}>&#10003;</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonRectangle} onPress={() => this._showAllDesignsPanelVisibility.bind(this)(false)}>
            <Text style={styles.buttonRectangleText}>&or;</Text>
          </TouchableHighlight>
          <TouchableHighlight style={styles.buttonRectangle} onPress={this.deleteDesignsFromAll.bind(this)}>
            <Text style={styles.buttonRectangleText}>&#10005;</Text>
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
              verticalIndicators={this.state.verticalIndicators}
              horizontalIndicators={this.state.horizontalIndicators}
              verticalIndex={this.state.verticalIndex}
              horizontalIndex={this.state.horizontalIndex}
              cellSize={cellSize}
            />
            <View style={styles.propsPanel}>
              <DesignSettingsPanel
                visible={this.state.showConfigPanel}
                onClose={()=> this.setState({showConfigPanel : false})}
              />
              { this.state.showSelectedDesignsPanel && selectedDesignsPanel}
              { this.state.showAllDesignsPanel && allDesignsPanel}
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