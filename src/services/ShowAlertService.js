import { Alert } from 'react-native';
export default function(a){
    Alert.alert(a.title, a.message, a.buttons);
};
