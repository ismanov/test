import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';
import { addUploadPhoto, uploadPhotoType } from '../../redux/slices/rootSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { uploadStyle } from '../../styles/AddStyles/uploadStyle';
import ImageFrame from './ImageFrame';

const UploadImage = ()=>{
    const {uploadPhotos} = useAppSelector(state=>state.rootState)
    const dispatch = useAppDispatch()
    const upload = ()=>{
        launchImageLibrary({selectionLimit:1, noData:true, mediaType:'photo'}, (res:{assets:uploadPhotoType[]})=>{
            console.log(res);
            
            if (res.assets && res.assets[0]?.uri) {
                dispatch(addUploadPhoto(res.assets[0]))
            }
            
        })
    }
    return <View style={uploadStyle.container}>
        {uploadPhotos.map((item,index)=><ImageFrame key={index+item.uri} photo={item}/>)}
        <TouchableOpacity onPress={()=>{upload()}} style={uploadStyle.addBox}><Text>+</Text></TouchableOpacity>
    </View>
}
export default UploadImage