import { StyleSheet } from 'react-native';
import { fullSize, size } from './rootStyle';


export const contentStyle = StyleSheet.create({
    container: {
        marginTop:fullSize.height*.05-.3*size,
        width: fullSize.width,
        height: fullSize.height*.86 ,
        borderTopColor:'black',
        borderTopWidth:.3*size
    },
    
});