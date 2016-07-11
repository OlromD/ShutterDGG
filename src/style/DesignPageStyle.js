import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#eee',
    // flexDirection: 'row'
  },
  constructorContainer :{
    flex: 1,
    backgroundColor : 'red',
    flexDirection : 'column'
  },
  constructor: {
    flex: 1,
    backgroundColor: 'green'
  },
  controlPanel: {
    height: 150,
    backgroundColor: '#201f25',
    flexDirection : 'row',
    justifyContent : 'space-between'
  },
  controlPanelLogo : {
    width: 150,
    resizeMode: 'stretch',
    height: 100
  },
  openPropsButton : {
    width: 130,
    height: 30,
    backgroundColor: '#68c6c8',
    marginTop: 10,
    marginBottom: 10,
    borderRadius: 5
  },
  openPropsButtonText : {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  logoContainer : {
    width: 180,
    flex: 1,
    alignItems : 'center',
    flexDirection: 'column'
  },
  joystick : {
    width: 170,
    justifyContent : 'center',
    alignItems: 'center'
  },
  joystickDirectionButton : {
    width: 35,
    height: 35,
    backgroundColor: '#68c6c8',
    borderRadius: 5,
    margin: 10
  },
  joystickOKButton : {
    width: 50,
    height: 40,
    backgroundColor: '#68c6c8',
    borderRadius: 5,
  },
  joystickOKButtonText: {
    color: '#fff',
    textAlign: 'center',
    fontSize: 20,
    margin: 5
  },
  joystickDirectionButtonText : {
    color: '#fff',
    textAlign: 'center',
    margin: 5,
    fontSize: 20
  }
});
