import { StyleSheet } from 'react-native';
import { fullSize, size } from '../rootStyle';


export const uploadStyle = StyleSheet.create({
    container: {

        width: fullSize.width-8*size,
        height: fullSize.height*.31,
        flexDirection:'row',
        flexWrap:'wrap',
        marginTop:fullSize.height*.06,
        marginRight:4*size,
        marginLeft:4*size,
        backgroundColor:'#f5dbda',
        borderStyle:'dashed',
        borderWidth:.8*size,
        borderColor:'rgb(157, 190, 245)',
        borderRadius: 3*size
    },
    scrollContainer:{
        width: fullSize.width-8*size,
        padding:0
    },
    addBox:{
        width:25*size,
        margin:3*size,
        height: 25*size,
        borderRadius:3*size,
        borderWidth: .7*size,
        borderColor:'grey',
        alignItems:'center',
        justifyContent:'center',
    }
    
    
});