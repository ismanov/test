/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React , {useEffect} from 'react';
import {
  Alert,
  BackHandler,
  SafeAreaView,
  StatusBar,
} from 'react-native';

import VKLogin from 'react-native-vkontakte-login';
import { setTokenAndId } from './src/redux/slices/profileSlice';
import { sagaActions } from './src/redux/sagaActions';
import { RootState, useAppDispatch, useAppSelector } from './src/redux/store';
import Tab from './src/components/Tab';
import Content from './src/components/Content';
import SearchBar from './src/components/SearchBar';
import Auth from './src/Pages/Auth';

const App = () => {
  const {user_id,token ,first_name} = useAppSelector((state:RootState)=>state.profileState)
  const {albums} = useAppSelector((state:RootState)=>state.mediaState)
const dispatch = useAppDispatch()




useEffect(() => {
  
  VKLogin.initialize(7942268);
  const backAction = () => {
    Alert.alert("!!!", "Вы действительно хотите выйти??", [
      {
        text: "Нет ",
        onPress: () => null,
        style: "cancel"
      },
      { text: "Да", onPress: () => BackHandler.exitApp() }
    ]);
    return true;
  };

  const backHandler = BackHandler.addEventListener(
    "hardwareBackPress",
    backAction
  );

  return () => backHandler.remove(); 
}, []);

useEffect(() => {
  user_id && dispatch({type:sagaActions.GET_DATA})
  user_id && dispatch({type:sagaActions.GET_ALBUMS})
}, [user_id,]);


if(!token) return <Auth/>

  return (
    <SafeAreaView >
      <StatusBar translucent hidden />
      <SearchBar/>
      <Content/>
      <Tab/>
    </SafeAreaView>
  );
};


export default App;
