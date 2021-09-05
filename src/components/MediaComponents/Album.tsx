import React, { useCallback, useState } from 'react';
import { FlatList, Image, Text, TouchableOpacity, View } from 'react-native';
import { sagaActions } from '../../redux/sagaActions';
import { setPhoto } from '../../redux/slices/mediaSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fullSize, size } from '../../styles/rootStyle';

const Album: React.FC = ()=> {
    const {photos,album} = useAppSelector(s=>s.mediaState)
    const {} = useAppSelector(s=>s.profileState)
    const dispatch = useAppDispatch()
    const [refresh, setRefresh] = useState(false)

    const renderItem = useCallback((props)=><Item {...props}/>,[])

    return <View style={{width:'100%', height:fullSize.height*.80 ,paddingLeft:3*size, paddingRight:3*size}}>
        <FlatList
        showsVerticalScrollIndicator={false}
            data={photos}
            keyExtractor={(item)=>item.id}
            renderItem={renderItem}
            columnWrapperStyle={{justifyContent: 'space-between'}}
            numColumns={4}
            onEndReached={()=>{
                if((album?.size ? album.size:0 )> (photos? photos.length:0))    
                {dispatch({type:sagaActions.GET_LAZY_PHOTO,payload: album?.id})}
            }}
            onEndReachedThreshold={.7}
            onRefresh={() => {
                setRefresh(true)
                dispatch({type:sagaActions.GET_ALBUM, payload:album, func:()=>{setRefresh(false)}})
            }}
            refreshing={refresh}
        />
    </View>
}
export default Album;

const Item:React.FC<{item:any; index: number}> =({item, index})=>{
    const dispatch = useAppDispatch()
    return <TouchableOpacity onPress={()=>dispatch(setPhoto(item))} style={{margin:size, width:20*size, alignItems:'center', height:26*size,paddingTop:.3*size}}>
        <Image style={{width:20*size,height:20*size, borderRadius:2*size, resizeMode:'cover'}} source={{uri:item.small_photo}}/>
        <Text numberOfLines={1} style={{marginTop:size, fontSize:2*size}}>{item.name}</Text>
    </TouchableOpacity>
}