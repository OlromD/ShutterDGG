import {
  StyleSheet
} from 'react-native';

export default StyleSheet.create({
  container : {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, .5)',
    alignItems: 'center',
    justifyContent: 'center'
  },
  contentContainer: {
    width: 250,
    backgroundColor: '#fff',
    padding: 10
  },
  actionContainer : {
    backgroundColor: '#efefef',
    padding: 5,
    margin: 5,
    borderRadius: 5
  },
  actionText: {
    textAlign: 'center',
    fontSize: 17,

  },
  title: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10
  },
  controlButtons : {
    alignItems: 'center'
  },
  closeButton : {
    padding: 15,
    paddingTop: 5,
    paddingBottom: 5,
    backgroundColor: '#6ac8c8',
    borderRadius: 5,
    margin: 10
  },
  closeButtonText: {
    fontSize: 18,
    color: '#fff',
    textAlign: 'center'
  }
});
