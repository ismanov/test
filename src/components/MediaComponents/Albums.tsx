import React, { useCallback, useEffect, useState } from 'react';
import { ActivityIndicator, FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { resType } from '../../redux/saga';
import { sagaActions } from '../../redux/sagaActions';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { getResource } from '../../REST/api';
import { size } from '../../styles/rootStyle';
import { parseDate } from '../../utils/helpers';

const Albums: React.FC = ()=> {
    const {albums} =useAppSelector(s=>s.mediaState)
    const {token, user_id} =useAppSelector(s=>s.profileState)
    const renderItem = useCallback((props)=><Item {...props} user_id={user_id} token={token} />,[])

    return <View style={{
        width:'100%',

    }}>
        <FlatList
        data={albums}
        keyExtractor={(item, index)=>item.id}
        renderItem={renderItem}
        />
    </View>
}
export default Albums;

const Item:React.FC<{item:any;index: string; user_id: string; token: string}> = ({item,index,user_id, token})=>{
    const dispatch = useAppDispatch()
    const [photo, setPhoto] = useState('')
    useEffect(() => {
       getResource('photos.get',{owner_id:user_id, album_id:item.id,count:1,access_token:token, v:5.52 }).then((res:resType)=>{
           if(res?.response?.items[0]?.photo_130){
               setPhoto(res?.response?.items[0]?.photo_130)
           }
       })
    }, []);

    const getAlbum =() => {
        dispatch({type:sagaActions.GET_ALBUM, payload:item})
    }

    return (
        <View
style={{
    width:'100%',
    height: 25*size,
    paddingLeft:5*size,
    paddingRight:5*size,
    flexDirection:'row',
    alignItems:'center',

    marginTop:size,
borderBottomWidth:.1*size,
    elevation: 2,
    backgroundColor:'#e3e3e3'

}}
>
    {photo?<Image source={{uri:photo}} style={{width:20*size, height:20*size, resizeMode:'stretch'}} />:<View style={{width:20*size, height:20*size, alignItems:'center', justifyContent:'center'}}><ActivityIndicator size='large' color='blue'/></View>}
    <View style={{marginLeft: 3*size, height:16*size, justifyContent:'space-between'}}>
        <TouchableOpacity onPress={getAlbum}><Text style={{color:'#42a1c9', fontSize:5*size, fontWeight:'bold'}}>{item.title}</Text></TouchableOpacity>
        <Text style={{color:'grey', }}>📅 {parseDate(new Date(item.date*1000)) }</Text>
        <Text style={{color:'grey',}}>🗚 {item.size}</Text>
    </View>
</View>
    )
}