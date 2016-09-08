import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableHighlight,
  Modal,
  StyleSheet,
  Alert,
  NativeAppEventEmitter,
  TextInput
} from 'react-native';
import BleManager from 'react-native-ble-manager';
import Button from '../components/Button';


const ALERTS = {
  connection: {
    fail: {
      title: 'Ooops...',
      message: 'Could not connect to device. Please, try again.'
    }
  },
  writing: {
    success: {
      title: 'Success',
      message: 'The design has been loaded on device.'
    },
    fail: {
      title: 'Ooops...',
      message: 'Could not load design on device. Please, try again.'
    }
  }
};

export default class BluetoothConnectionModal extends Component{
  constructor(props){
    super(props);

    this.state = {
      scanning: false,
      devices: [],
      serviceUUID: 'CA8175D3-7F66-46DA-9334-B4467A4247A3',
      characteristicUUID: 'CA8175D3-7F66-46DA-9334-B4467A4247A5',
    };

    this.getDevices = this.getDevices.bind(this);
    this.onScanButtonPress = this.onScanButtonPress.bind(this);
    this.onDeviceItemPress = this.onDeviceItemPress.bind(this);
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.connectToDevice = this.connectToDevice.bind(this);
    this.writeDataToDevice = this.writeDataToDevice.bind(this);
  }

  componentWillMount(){
    NativeAppEventEmitter
      .addListener('BleManagerDiscoverPeripheral', this.handleDiscoverPeripheral );
    NativeAppEventEmitter
      .addListener('BleManagerStopScan',this.handleStopScan);
  }

  handleDiscoverPeripheral(data){
      const devices = this.state.devices;
      this.setState({
        devices : [].concat(devices).concat(data)
      });
  }

  getDevices(){
    const { devices } = this.state;
    if (!devices.length)
      return (
        <Text style = { styles.description } >There are no available devices :(</Text>
      );
    return devices.map((device, index) => {
      return (
        <Button buttonStyle = { styles.deviceItem }
                textStyle = { styles.deviceItemText }
                onPress = { () => this.onDeviceItemPress(device) }
                key = { index }
        >
          { `${ device.name } <${ device.id }>` }
        </Button>
    );
    });
  }

  handleScan() {
      const SCAN_TIME = 30;
      BleManager.scan([], SCAN_TIME, true)
        .then((results) => {
          this.setState({
            scanning: true,
            devices: []
          });
        });
  }

  handleStopScan(){
      this.setState({
        scanning: false
      });
  }

  onDeviceItemPress(device){
    this.connectToDevice(device, this.writeDataToDevice);
  }

  writeDataToDevice(device){
    const { data } = this.props,
          { serviceUUID, characteristicUUID } = this.state,
          { success, fail } = ALERTS.writing;
    BleManager.write(device.id, serviceUUID, characteristicUUID, data)
      .then(() => {
        Alert.alert(success.title, success.message);
      })
      .catch(() => {
        Alert.alert(fail.title, fail.message);
      });
  }
  

  onScanButtonPress(){
    this.handleScan();
  }

  connectToDevice(device, writeDataCallback){
    const { fail } = ALERTS.connection;
    BleManager.connect(device.id)
      .then(() => {
        writeDataCallback(device);
      })
      .catch((error) => {
        Alert.alert(fail.title, fail.message);
      });
  }

  render(){
    const { visible, onClose } = this.props,
          { scanning } = this.state;
    return (
        <Modal animationType = { "slide" }
               transparent = { true }
               visible = { visible }
        >
          <View style = { styles.wrapper }>
            <View style = { styles.content }>
              <Text style = { styles.title } >Run design on device</Text>
              { this.getDevices() }
              <View style = { styles.controlButtons }>
                <Button buttonStyle = { styles.btn }
                        textStyle = { styles.btnText }
                        onPress = { !scanning? this.onScanButtonPress: null }
                >
                  { !scanning? 'Scan': 'Scanning...' }
                </Button>
                <Button buttonStyle = { styles.btn }
                        textStyle = { styles.btnText }
                        onPress = { onClose } 
                >
                  Close
                </Button>
              </View>
            </View>
          </View>
        </Modal>
    );
  }
}


const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    // justifyContent: 'center',
    // alignItems: 'center'
  },
  content: {
    width: 400,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding:10,
    margin: 20
  },
  controlButtons: {
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row'
  },
  btn: {
    backgroundColor: '#69c8ca',
    padding: 10,
    width: 150,
    margin: 10,
    borderRadius: 5
  },
  btnText: {
    textAlign: 'center',
    fontSize: 17,
    color: '#fff'
  },
  title: {
    fontSize: 24,
    color: '#444',
    textAlign: 'center',
    margin:10
  },
  description: {
    fontSize: 19, 
    color: '#777',
    textAlign: 'center',
    margin: 20
  },
  deviceItem: {
    padding:10,
    margin: 10,
    backgroundColor: '#eee'
  },
  deviceItemText: {
    textAlign: 'left',
    fontSize: 17
  }
});