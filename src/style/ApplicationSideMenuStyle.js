import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  menuContainer : {
    flex: 1,
    // borderColor: '#575a5f',
    // borderRightWidth : 1,
    paddingTop : 40,
    backgroundColor : '#24272e',
    flexDirection: 'column',
  },
  menuCaption : {
    flexDirection: 'row',
    padding: 20,
    marginBottom: 20,
    backgroundColor: '#14171e'
  },
  menuLable: {
    color: '#fff',
    fontSize: 24,
    marginLeft: 20
  },
  menuItem : {
    padding: 15,
    fontSize: 25,
    textAlign: 'left',
    color: '#fff',
    marginLeft: 30,
    borderBottomWidth: 1,
    borderColor: 'green'
  },
  menuItem: {
    flexDirection: 'row',
    padding: 20,
  },
  menuItemContent : {
    flexDirection: 'row'
  },
  menuItemIcon : {
    width: 30,
    height:30,
    marginLeft: 5,
  },
  menuIcon : {
    width: 35,
    height:35,
    marginLeft: 5,
  },
  menuItemLable : {
    color: '#fff',
    fontSize: 23,
    marginLeft: 15
  }
});
