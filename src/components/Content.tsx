import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import Add from '../Pages/Add';
import Media from '../Pages/Media';
import { useAppSelector } from '../redux/store';
import { contentStyle } from '../styles/contentStyle';
import { parsePath } from '../utils/helpers';

const Content: React.FC = () => {
    const {path} = useAppSelector(state=>state.rootState)
    const [page, setPage]=useState<React.ReactElement>(<Media/>)
    useEffect(() => {
        switch (parsePath(path, 0)) {
            case 'media':
                setPage(<Media/>)
                break;
        
            case 'add':
                setPage(<Add/>)
                break;
        
            default:
                break;
        }
    }, [path]);
    return <View style={contentStyle.container}>
        {page}
    </View>
}
export default Content;