import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  scrollContainer : {
    backgroundColor : '#35383f',
  },
  container :{
    flex : 1,
    alignItems : 'center',
    alignSelf : 'center',
    paddingTop: 40,
    height: null
  },
  applicationName : {
    color : '#68c6c8',
    marginTop: 5,
    fontSize : 25,
    fontWeight : 'bold'
  },
  applicationCaption : {
    color : '#68c6c8',
    marginTop: 5,
    fontSize : 35,
    fontWeight : 'bold'
  },
  byText : {
    color : '#fdfdfd',
    marginTop: 5,
    fontSize : 17,
    fontWeight : 'bold'
  },


  logo : {
    width: 300,
    height: 150,
    resizeMode : 'cover',
    margin: 5
  },
  enterDimensionsText : {
    color : '#c9c9c9',
    fontSize: 18,
  },
  unitOfMeasurement : {
    color : '#c9c9c9',
    fontSize: 15,
  },
  dreamglassgroupText : {
    color : '#c9c9c9',
    fontSize : 16,
    fontWeight: 'bold'
  },
  socialIcons : {
    marginTop: 40,
  },
  socialIconsContainer : {
    flexDirection:'row',
    alignItems: 'flex-start',
  },
  socialIcon : {
    width: 30,
    height: 30,
    resizeMode : 'cover',
    margin: 5,
    backgroundColor: 'transparent',
    borderColor: '#fff',
    borderWidth: 1,
    borderRadius: 15,
    margin: 12
  },
});
