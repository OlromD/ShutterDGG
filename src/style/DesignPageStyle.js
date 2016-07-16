import { StyleSheet, Dimensions } from 'react-native';

const windowWidth = Dimensions.get('window').width;

export default StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#fff',
  },
  constructorContainer :{
    flex: 1,
    flexDirection : 'column'
  },
  constructor: {
    flex: 1,
    flexDirection: 'row'
  },
  grid : {
    flex: 3,
    justifyContent:'center',
    alignItems: 'center'
  },
  propsPanel : {
    flex: 2,
    backgroundColor: '#fff',
    flexDirection: 'column',
    justifyContent: 'flex-end',
    marginTop: 10,
    marginBottom: 10,

  },
  panel : {
    flex: 1,
    flexDirection: 'column',
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: '#f3f4f8'
  },
  panelHeader : {
    height: 60,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelBody : {
    flex: 1,
    flexDirection: 'row'
  },
  panelPropsContainer : {
    flex: 1,
  },
  panelPropTitle: {
    backgroundColor: '#69c9c8',
    flexDirection: 'row',
    paddingTop: 5,
    paddingBottom: 5,
    alignItems: 'center'
  },
  panelPropTitleText: {
    color: '#fff',
    fontSize: 22,
    textAlign: 'left',
    flex: 1
  },
  titleCaret : {
    color: '#fff',
    fontSize: 25,
    width: 70,
    textAlign: 'center'
  },
  panelPropList: {
    backgroundColor: '#fff',
    flexDirection: 'column'
  },
  panelPropListItem : {
    padding: 7,
    paddingLeft: 10,
    backgroundColor: '#f3f4f8',
    borderBottomColor: '#eee',
    borderBottomWidth: 1
  },
  panelPropListItemText: {
    color: '#888',
    textAlign: 'left',
    fontSize: 20
  },
  panelPropTable: {
    flexDirection: 'row',
    backgroundColor: '#f3f4f8',
    flexWrap: 'wrap',
  },
  panelPropTableItem : {
    width: (windowWidth*2/5 - 60) / 3 -1,
    height: 35,
    backgroundColor: '#f3f4f8',
    borderColor: '#eee',
    borderWidth: 1
  },
  panelPropDesignsTable : {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    backgroundColor: '#fff'
  },
  panelPropTableDesignItem : {
    width: (windowWidth*2/5 - 20) / 5 -1,
    height: 30,
    backgroundColor: '#f3f4f8',
    borderColor: '#eee',
    borderWidth: 1
  },
  panelPropTableItemText: {
    color: '#888',
    textAlign: 'center',
    fontSize: 20
  },
  panelTitle: {
    backgroundColor: '#e0e9e6',
    width: 60,
    alignItems: 'center',
    justifyContent: 'center'
  },
  panelTitleText: {
    fontSize: 22,
    textAlign: 'center',
    transform: [{rotate: '-90deg'}],
    height: 50,
    color: '#888'
  },
  buttonRounded : {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderColor: '#aaa',
    borderWidth: 1,
    justifyContent: 'center'
  },
  buttonRoundedText: {
    fontSize: 23,
    color: '#999',
    textAlign: 'center'
  },
  controlPanel: {
    height: 200,
    padding: 5,
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
    paddingLeft: 5,
    paddingRight: 5,
    height: 30,
    backgroundColor: '#68c6c8',
    margin: 5,
    borderRadius: 5
  },
  openPropsButtonText : {
    color: '#fff',
    fontSize: 18,
    textAlign: 'center'
  },
  saveButton : {
    paddingLeft: 5,
    paddingRight: 5,
    height: 30,
    backgroundColor: '#68c6c8',
    margin: 5,
    borderRadius: 5
  },
  saveButtonText : {
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
  // joystickOKButtonText: {
  //   color: '#fff',
  //   textAlign: 'center',
  //   fontSize: 20,
  //   margin: 5
  // },
  // joystickDirectionButtonText : {
  //   color: '#fff',
  //   textAlign: 'center',
  //   margin: 5,
  //   fontSize: 20
  // },
  gridContainer: {
    flex: 1,
    margin: 10,
    marginBottom: 0,
    // backgroundColor: 'red',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  horizontalIndicatorsContainer: {
    flexDirection: 'row'
  },
  verticalIndicatorsContainer: {
    flexDirection: 'column'
  },
  gridIndicator : {
    backgroundColor: 'yellow',
    borderColor: '#bbb',
    borderWidth: 1,
  },
  gridCell : {
    backgroundColor: '#ccc',
    borderWidth: 1,
    borderColor: '#bbb',
  },
  leftControlPanel: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingTop: 20
  },
  leftControlPanelButton: {
    backgroundColor: '#68c6c8',
    width: 135,
    height: 60,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    margin: 5
  },
  editNewDesignButton : {
    backgroundColor: '#68c6c8',
    width: 135,
    height: 40,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    margin: 10
  },
  rightPanelActionButton : {
    backgroundColor: '#68c6c8',
    width: 60,
    height: 70,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    margin: 5,
    marginTop: 10
  },
  joystickDirectionButton : {
    backgroundColor: '#68c6c8',
    width: 50,
    height: 50,
    justifyContent: 'center',
    padding: 5,
    borderRadius: 5,
    alignItems: 'center'
  }
});
