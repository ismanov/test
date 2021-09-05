import { Alert, Platform, ToastAndroid } from "react-native";

export const isAndroid:boolean = Platform.OS === 'android'

export const toast = (text:string) => {
    console.log(text);
    
    if (isAndroid) {
        ToastAndroid.show(text, ToastAndroid.SHORT)
    } else {
        Alert.alert(text)
    }
}