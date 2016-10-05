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
        },
      },
      SERVICE_UUID = 'CA8175D3-7F66-46DA-9334-B4467A4247A3',
      CHARACTERISTIC_UUID = 'CA8175D3-7F66-46DA-9334-B4467A4247A5';



export default class BluetoothConnectionModal extends Component{
  constructor(props){
    super(props);

    this.state = {
      scanning: false,
      devices: [],
      loading: false,
      loadedDesigns: 0
    };

    this.getDevices = this.getDevices.bind(this);
    this.onScanButtonPress = this.onScanButtonPress.bind(this);
    this.onDeviceItemPress = this.onDeviceItemPress.bind(this);
    this.handleDiscoverPeripheral = this.handleDiscoverPeripheral.bind(this);
    this.handleScan = this.handleScan.bind(this);
    this.handleStopScan = this.handleStopScan.bind(this);
    this.connectToDevice = this.connectToDevice.bind(this);
    this.writeManuallyDataToDevice = this.writeManuallyDataToDevice.bind(this);
    this.writeAutomaticallyDataToDevice = this.writeAutomaticallyDataToDevice.bind(this);
    this.writeDesignsData = this.writeDesignsData.bind(this);
    this.loadDesign = this.loadDesign.bind(this);
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
    Alert.alert('Choose action', 'Choose what data you wanna send', [
    {
      text: 'Automatically',
      onPress: () => this.connectToDevice(device, this.writeAutomaticallyDataToDevice)
    },
    {
      text: 'Manually',
      onPress: () => this.connectToDevice(device, this.writeManuallyDataToDevice)
    },
    {
      text: 'Load designs',
      onPress: () => this.connectToDevice(device, this.writeDesignsData)
    }
    ]);
    
  }

  writeManuallyDataToDevice(device){
    const { dataForManuallySending: data } = this.props,
          { success, fail } = ALERTS.writing;
    BleManager.write(device.id, SERVICE_UUID, CHARACTERISTIC_UUID, data)
      .then(() => {
        Alert.alert(success.title, success.message);
      })
      .catch(() => {
        Alert.alert(fail.title, fail.message);
      });
  }

  writeAutomaticallyDataToDevice(device){
    const { dataForAutomaticallySending: data } = this.props,
          { success, fail } = ALERTS.writing;
    BleManager.write(device.id, SERVICE_UUID, CHARACTERISTIC_UUID, data)
      .then(() => {
        Alert.alert(success.title, success.message);
      })
      .catch(() => {
        Alert.alert(fail.title, fail.message);
      });
  }

  writeDesignsData(device){
    const { designsDataForLoading: designs } = this.props;
    this.setState({
      loadedDesigns: 0
    });
    const DELAY = 300;
    let loadingProcess;
    let loadingChain = this.loadDesign(device, designs[designs.length - 1], () => {
      const { designsDataForLoading:designs } = this.props;
      Alert.alert('Success', `Loaded ${this.state.loadedDesigns} of ${designs.length}`);
    });
    for (let i = designs.length - 2; i >= 0; i--){
      loadingChain = this.loadDesign(device, designs[i], loadingChain);
    }
    loadingChain();
    // BleManager.write(device.id, SERVICE_UUID, CHARACTERISTIC_UUID, designs[0])
    //   .then(() => {
    //     Alert.alert('Design 1 has been loaded');
    //     setTimeout(() => {
    //       BleManager.write(device.id, SERVICE_UUID, CHARACTERISTIC_UUID, designs[1])
    //       .then(() => {
    //         Alert.alert('Design 2 has been loaded');

    //       })
    //       .catch(() => {
    //         Alert.alert('Fail', 'Try to load again');
    //       });
    //     }, 1000);
    //   })
    //   .catch(() => {
    //     Alert.alert('Fail', 'Try to load again');
    //   });
    
  }
  
  loadDesign(device, design, callback){
    const DELAY = 300;
    return () => {
      // new Promise((resolve, reject) => {
      //   setTimeout(() => {
      //     resolve();
      //   }, 1000)
      // })
      BleManager.write(device.id, SERVICE_UUID, CHARACTERISTIC_UUID, design)
        .then(() => {
          const { loadedDesigns } = this.state;
          const { designsDataForLoading:designs } = this.props;

          Alert.alert('Success', `Loaded ${loadedDesigns} of ${designs.length}`);
          this.setState({
            loadedDesigns: loadedDesigns + 1
          });
          setTimeout(() => {
            if (callback)
              callback();
          }, DELAY);
        })
        .catch(() => {
          Alert.alert('Fail', 'Try to load again');
        });
    }
  }

  onScanButtonPress(){
    this.handleScan();
    // this.writeDesignsData(null);
    // Alert.alert(this.props.data);
    // this.onDeviceItemPress();
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
    const { visible, onClose, dataForAutomaticallySending, dataForManuallySending, designsDataForLoading } = this.props,
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
    backgroundColor: 'rgba(0,0,0,.7)',
    justifyContent: 'center',
    alignItems: 'center'
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

// <Text style = { [styles.description, { fontSize: 15 }] }>
//   { `Automatically data:\n${ dataForAutomaticallySending } ` }
// </Text>
// <Text style = { [styles.description, { fontSize: 15 }] }>
//   { `Manually data:\n${ dataForManuallySending } ` }
// </Text>
// <Text style = { [styles.description, { fontSize: 15 }] }>
//    { `Designs for loading:\n${ JSON.stringify(designsDataForLoading) } ` }
// </Text>