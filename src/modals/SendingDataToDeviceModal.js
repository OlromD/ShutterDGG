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


export default class BluetoothConnectionModal extends Component{
  constructor(props){
    super(props);

    this.state = {
      scanning: false,
      devices: [],
      serviceUUID: 'CA8175D3-7F66-46DA-9334-B4467A4247A3',
      characteristicUUID: 'CA8175D3-7F66-46DA-9334-B4467A4247A5',
      data: ''
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
      console.log(data);
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
          { `${device.name} <${device.id}>` }
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
            console.log('Scan started');
          });
  }

  handleStopScan(){
      this.setState({
        scanning: false
      });
      console.log('Scan stopped');
  }

  onDeviceItemPress(device){
    this.connectToDevice(device, this.writeDataToDevice);
  }

  writeDataToDevice(device){
    const { data } = this.props;
    const { serviceUUID, characteristicUUID } = this.state;
    BleManager.write(device.id, serviceUUID, characteristicUUID, data)
    .then(() => {
      Alert.alert('Success', `Next data has been transferred:\n${data}`);
    })
    .catch((error) => {
      Alert.alert('Error', 'Error occured while writing data. Try again.');
      
    });
  }

  onScanButtonPress(){
    this.handleScan();
  }

  connectToDevice(device, writeDataCallback){
    BleManager.connect(device.id)
      .then(() => {
        // Alert.alert('Success', `Connected to device ${device.name}`);
        writeDataCallback(device);
      })
      .catch((error) => {
        Alert.alert('Ooops...', 'Error occured while connecting. Try again.');
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