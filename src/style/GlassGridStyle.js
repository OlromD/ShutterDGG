import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  grid : {
    flex: 1,
    justifyContent:'center',
    alignItems: 'center'
  },
  gridCellsContainer : {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center'
  },
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
});
