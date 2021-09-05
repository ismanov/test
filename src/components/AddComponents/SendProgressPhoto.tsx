import React from 'react';
import { Image, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { uploadStyle } from '../../styles/AddStyles/uploadStyle';
import { fullSize, size } from '../../styles/rootStyle';
import ImageProgress from './ImageProgress';

const SendProgress:React.FC = ()=>{
    const {inContainer} = useAppSelector(state=>state.rootState)
    const {uploadPhotosProgress} = useAppSelector(state=>state.rootState)
    const dispatch = useAppDispatch()
    return <View style={{...uploadStyle.container,backgroundColor:'#cdd1cd' ,overflow:'hidden',position:'absolute',left:0, top: fullSize.height*.45}}>
        { uploadPhotosProgress.length ?
            <View style={{flex:1}}>
                <ScrollView  contentContainerStyle={{flexGrow:1,flexDirection:'row', flexWrap:'wrap',padding:0}} >
                {
                    uploadPhotosProgress.map((item,index)=><ImageProgress key={index+item.uri} photo={item} />)
                }
            </ScrollView>
            </View>: <View/>
        }
        {!uploadPhotosProgress.length?<View 
            style={{width:'100%', height:'100%', alignItems:'center', justifyContent:'center'}}
        ><Text>Перетащите сюда изображение</Text></View>:<View/>}
    </View>
}
export default SendProgress