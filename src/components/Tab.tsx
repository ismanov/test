import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import { setPath } from '../redux/slices/rootSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { tabStyle } from '../styles/tabStyle';
import { parsePath } from '../utils/helpers';

const Tab: React.FC = () => {
    const {path} = useAppSelector((state)=>state.rootState)
    const dispatch = useAppDispatch()
    return <View style={tabStyle.container}>
        <TouchableOpacity onPress={()=>dispatch(setPath('media'))} style={[tabStyle.navBtn, parsePath(path,0) === 'media'?tabStyle.selected:{}]}><Image style={tabStyle.navIcon}  source={require('../assets/icons/imageIcon.png')}/></TouchableOpacity>
        <TouchableOpacity disabled={true} style={[tabStyle.navBtn, tabStyle.disabled]}><Image style={tabStyle.navIcon}  source={require('../assets/icons/album.png')}/></TouchableOpacity>
        <TouchableOpacity disabled={true} style={[tabStyle.navBtn,tabStyle.disabled]}><Image style={tabStyle.navIcon}  source={require('../assets/icons/album.png')}/></TouchableOpacity>
        <TouchableOpacity disabled={true} style={[tabStyle.navBtn, tabStyle.disabled]}><Image style={tabStyle.navIcon}  source={require('../assets/icons/album.png')}/></TouchableOpacity>
        <TouchableOpacity disabled={true} style={[tabStyle.navBtn, tabStyle.disabled]}><Image style={tabStyle.navIcon}  source={require('../assets/icons/album.png')}/></TouchableOpacity>
        <TouchableOpacity onPress={()=>dispatch(setPath('add'))} style={[tabStyle.navBtn, parsePath(path,0) === 'add'?tabStyle.selected:{}]}><Image style={tabStyle.navIcon}  source={require('../assets/icons/upload.png')}/></TouchableOpacity>
    </View>
}

export default Tab;