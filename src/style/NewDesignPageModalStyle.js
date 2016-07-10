import {
  StyleSheet,
  Dimensions
} from 'react-native';

// w should be equal to screen width
const w = Dimensions.get('window').width - 20;
export default StyleSheet.create({
  wrapper : {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,.5)',
    alignItems : 'center',
    justifyContent: 'center'
  },
  contentContainer : {
    backgroundColor: '#fff',
    height: null,
    width: w,
    padding: 20,
  },
  title : {
    textAlign: 'center',
    fontSize: 20,
    marginBottom: 20
  },
  closeButton: {
    padding: 5,
    backgroundColor: '#69c8ca',
    width: 100,
    borderRadius: 5,
    margin: 10
  },
  closeButtonText : {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18
  },
  propContainer : {
    marginBottom: 10,
    flexDirection : 'row',
    justifyContent: 'space-between'
  },
  propLabel : {
    fontSize: 17,
    textAlign: 'left',
    width: null,
    marginTop: 5
  },
  animationTypePicker : {
    backgroundColor : '#efefef',
    width: 190,
    height: 30,
    marginTop: 5
  },
  timeSequencePicker : {
    backgroundColor : '#efefef',
    width: 55,
    height: 30,
    marginTop: 5
  }
});
