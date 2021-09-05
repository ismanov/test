import { StyleSheet } from 'react-native';
import { fullSize, size } from '../rootStyle';


export const addStyle = StyleSheet.create({
    label: {
        width: fullSize.width,
        borderTopColor:'grey',
        borderTopWidth:.3*size,
        marginTop: 8*size,
        fontWeight:'bold',
        fontSize: 4*size,
        padding: 4*size

    },

});