import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  dimensionPicker : {
    backgroundColor : '#fff',
    width: 120,
    height:30,
    padding: 5,
    margin: 5,
    marginTop: 10,
    paddingLeft: 10,
  },
  dimensionsContainer : {
    alignItems: 'flex-start',
    flexDirection:'row',
  },
  confirmButtonText :{
    textAlign: 'center',
    fontSize: 16,
    color: '#fff',
    fontWeight : 'bold'
  },
  confirmButton :{
    width: 250,
    padding: 10,
    backgroundColor : '#69c8ca',
    margin: 5,
    marginTop: 10,
  },
  dimensionPickerItemStyle : {
    width: 100,
    
  }
});
