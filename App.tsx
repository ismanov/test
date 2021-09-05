

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
import { isAndroid } from './src/utils/constants';

const App = () => {
  const {user_id,token ,first_name} = useAppSelector((state:RootState)=>state.profileState)
  const {path} = useAppSelector((state:RootState)=>state.rootState)
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

useEffect(() => {
   if(user_id && path.includes('media')) dispatch({type:sagaActions.GET_ALBUMS})
}, [path]);


if(!token) return <Auth/>

  return (
    <SafeAreaView >
      <StatusBar translucent hidden={isAndroid} />
      <SearchBar/>
      <Content/>
      <Tab/>
    </SafeAreaView>
  );
};


export default App;
