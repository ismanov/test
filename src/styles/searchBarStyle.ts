import { StyleSheet } from 'react-native';
import { fullSize, size } from './rootStyle';


export const searchBarStyle = StyleSheet.create({
    container: {
        width: fullSize.width,
        height: fullSize.height*.07,
        flexDirection:'row',
        justifyContent: 'flex-end',
        alignItems:'center',
        paddingRight:4*size,
        paddingLeft:4*size,
        backgroundColor:'rgb(43, 40, 40)'

    },
    searchContainer:{
        width:50*size,
        height: fullSize.height*.050,
        borderRadius:5*size,
        borderWidth:.3*size,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor:'rgb(133, 130, 130)',
        paddingLeft:3*size,
        paddingRight:3*size,
    },
    input:{
        width:30*size,
        padding:0,
        height: fullSize.height*.046,
        borderWidth:0,
        color:'white'
    },
    searchIcon:{
        fontSize: 4*size,
        color:'white',

    },
    clear:{
        backgroundColor:'white',
        alignItems:'center',
        justifyContent:'center',
        width:4*size,
        height:4*size,
        borderRadius:2*size
    }
    
});