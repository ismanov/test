import { StyleSheet } from 'react-native';
import { fullSize, size } from '../rootStyle';


export const pickerStyle = StyleSheet.create({
    container: {
        position:'absolute',
        top:fullSize.height*.1,
        left:0,
        width: fullSize.width,
        justifyContent: 'space-between',
        alignItems:'flex-end',
        paddingRight:4*size,
        paddingLeft:4*size,
        

    },
    select:{
        width: '100%',
        height: fullSize.height*.04,
        borderRadius:.8*size,
        borderWidth:.3*size,
        flexDirection:'row',
        alignItems: 'center',
        justifyContent:'space-between',
        backgroundColor:'grey',
        paddingRight:2*size,
        paddingLeft:2*size,
        
    },
    name:{
        fontWeight:'bold',
        fontSize:4*size,
        color:'white'
    },
    body:{
        marginTop:.5*size,
        width: '100%',
        backgroundColor:'white',
        borderColor:'grey',
        overflow:'hidden'
    },
    optionStyle:{
        width:'100%',
        height:7*size,
        marginTop:2*size,
        paddingRight:2*size,
        paddingLeft:2*size,
        justifyContent:'center',
    },
    label:{
        fontSize:3.5*size,
        fontWeight:'bold'
    }
    
});