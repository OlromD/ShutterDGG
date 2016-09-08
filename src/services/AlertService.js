import {
	Alert
} from 'react-native';

function showAlert(alertData){
  const { title = '', message = '', buttons = null } = alertData;
  Alert.alert(title, message, buttons);
}

export { showAlert };