import { isAndroid } from './../utils/constants';
import { StyleSheet } from 'react-native';
import { fullSize, size } from './rootStyle';
import { getStatusBarHeight } from 'react-native-status-bar-height';

export const tabStyle = StyleSheet.create({
    container: {
        position:'absolute',
        top:fullSize.height*.07 + (isAndroid? 0:getStatusBarHeight()),
        left:0,
        width: fullSize.width,
        height: fullSize.height*.05,
        flexDirection:'row',
        justifyContent: 'space-between',
        alignItems:'flex-end',
        paddingRight:4*size,
        paddingLeft:4*size,

    },
    navBtn:{
        width:13*size,
        height: 8*size,
        borderRadius:1*size,
        borderWidth:.3*size,
        borderBottomEndRadius:0,
        borderBottomLeftRadius:0,
        
        alignItems: 'center',
        justifyContent:'center',
        backgroundColor:'white'
    },
    navIcon:{
        width:8*size,
        height:6*size,
        resizeMode:'stretch'
    },
    selected:{
        borderBottomColor:'white',
    },
    disabled:{
        opacity:.5,
    }
    
});