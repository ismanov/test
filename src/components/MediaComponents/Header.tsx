import React, { useEffect, useState } from 'react';
import { Image,Text, TextInput, TouchableOpacity, View } from 'react-native';
import { setAlbum, setPhoto, setPhotos } from '../../redux/slices/mediaSlice';
import { goBack } from '../../redux/slices/rootSlice';
import { useAppDispatch, useAppSelector } from '../../redux/store';
import { fullSize, size } from '../../styles/rootStyle';


const Header: React.FC = ()=>{
    const {first_name,last_name} =useAppSelector(s=>s.profileState)
    const {photo, photos} =useAppSelector(s=>s.mediaState)
    const dispatch = useAppDispatch()
    const [type, setType] = useState('albums')
    useEffect(() => {
      if(photo){
          setType('photo')
      }else if(photos){
          setType('album')
      }else setType('albums')
    }, [photo, photos]);

    const goBack = () => {
        switch (type) {
            case 'photo':
                dispatch(setPhoto(null))
                break;
            case 'album':
                dispatch(setPhotos(null))
                dispatch(setAlbum(null))
                break;
        }
    }
    

    return <View style={{width:'100%',paddingLeft:2*size, height:fullSize.height*.07,flexDirection:'row', alignItems:'center', borderBottomWidth:.4*size}}>
        { type === 'albums' ?<Text style={{fontWeight:'bold'}}>{`${first_name}, ${last_name}`}</Text> : <View/>}
        { type === 'album' ?<>
           <TouchableOpacity onPress={goBack}><Text style={{}}>⫷ 📂</Text></TouchableOpacity>
           <Text style={{ marginLeft:2*size, fontWeight:'bold'}}>{`${first_name} ${last_name}`}</Text> 
        </> :<View/>}
        { type === 'photo' ?<>
        <TouchableOpacity onPress={goBack}><Text style={{}}>⫷ </Text></TouchableOpacity>
           <Text style={{ marginLeft:2*size, fontWeight:'bold'}}>{photo?.name}</Text> 
        </> :<View/>}
    </View>
}

export default Header