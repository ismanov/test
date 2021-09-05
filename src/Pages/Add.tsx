import React, { useState } from 'react';
import { Text, View } from 'react-native';
import Picker from '../components/AddComponents/Picker';
import SendProgress from '../components/AddComponents/SendProgressPhoto';
import UploadImage from '../components/AddComponents/UploadImage';
import { albumType, setAlbum } from '../redux/slices/mediaSlice';
import { setAlbumId } from '../redux/slices/rootSlice';
import { useAppDispatch, useAppSelector } from '../redux/store';
import { addStyle } from '../styles/AddStyles/addStyle';
import { pickerStyle } from '../styles/AddStyles/pickerStyle';


const Add: React.FC = () =>{
    const {albums} = useAppSelector(state=>state.mediaState)
    const {uploadPhotos,uploadPhotosProgress, album_id} = useAppSelector(state=>state.rootState)
    const dispatch = useAppDispatch()
    return <View >
        <Text style={addStyle.label}>Select a folder</Text>
        {uploadPhotos?.length || uploadPhotosProgress?.length ? <SendProgress/>:<View/>}
        {albums?.length && album_id ? <UploadImage />:<View/>}
        
        <Picker label={(item:albumType)=>item.title} style={pickerStyle.container} list={albums} onChange={(val)=>{
            val?.id && dispatch(setAlbumId(val.id))
        }}/>
    </View>
}

export default Add;