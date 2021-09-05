import React, { useEffect, useState } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { Colors } from 'react-native/Libraries/NewAppScreen';
import Album from '../components/MediaComponents/Album';
import Albums from '../components/MediaComponents/Albums';
import Header from '../components/MediaComponents/Header';
import Photo from '../components/MediaComponents/Photo';
import { useAppSelector } from '../redux/store';


const Media: React.FC = () =>{
    const {photo,photos,albums} = useAppSelector(s=>s.mediaState)
    const [page, setPage]  = useState<JSX.Element>(<ActivityIndicator size='large' color='blue' />)

    useEffect(() => {
        if(photo){
            setPage(<Photo/>)
        }else
        if(photos){
            setPage(<Album/>)
        }else{
            setPage(<Albums/>)
        }
    }, [photo,photos,albums]);

    return <View>
        <Header/>
        {page}
    </View>
}

export default Media