import { Dimensions, StyleSheet } from 'react-native';
export const fullSize = Dimensions.get('window')
export const size = fullSize.width / 100

export const rootStyles = StyleSheet.create({
    container: {
        width: fullSize.width,
        height: fullSize.height,
    },
    
});