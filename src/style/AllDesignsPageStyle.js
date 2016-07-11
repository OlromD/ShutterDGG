import {
  StyleSheet,
  Dimensions
} from 'react-native';

const w = Dimensions.get('window').width,
      DESIGN_ITEM_SIZE = 40;

export default StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: '#eee',
    flexDirection: 'column'
  },
  selectedDesignsList : {
    flex: 1
  },
  allDesignsList : {
    flex: 2
  },
  titleContainer : {
    backgroundColor: '#6ac8c8'
  },
  title : {
    color: '#fff',
    fontSize : 20,
    textAlign : 'center',
    margin: 10,
  },
  designsContainer : {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'row',
    padding: (w % DESIGN_ITEM_SIZE) / 2,
    flexWrap: 'wrap',
  },
  designItem : {
    width: DESIGN_ITEM_SIZE,
    height: DESIGN_ITEM_SIZE,
    backgroundColor: '#f1f5f8',
    borderWidth: 1,
    borderColor: '#e1e5e8'
  },
  designItemText : {
    color: '#aeb2b3',
    fontSize: 18,
    textAlign: 'center',
    margin: 5
  },
  controlPanel  : {
    flex: 1,
    flexDirection : 'column'
  },
  controlPanelButtons : {
    flex: 1,
    backgroundColor: '#fff',
    flexDirection: 'column',
    padding: 10,
    alignItems: 'center'
  },
  controlPanelOptions : {
    flexDirection: 'column',
    padding: 10,
    backgroundColor: '#fff'
  },
  controlPanelOption : {
    flexDirection : 'row',
    justifyContent: 'space-between'
  },
  timeIntervalPicker : {
    width: 60,
    height: 30,
    backgroundColor: '#eee'
  },
  controlPanelOptionText : {
    backgroundColor: '#fff',
    fontSize: 16,
    margin: 5
  },
  controlButton: {
    paddingLeft: 10,
    paddingRight: 10,
    height: 30,
    backgroundColor : '#6ac8c8',
    borderRadius: 5,
    margin: 5
  },
  controlButtonText: {
    textAlign: 'center',
    color: '#fff',
    fontSize: 18,
  }
});
