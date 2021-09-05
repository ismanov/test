import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { useAppDispatch } from '../redux/store';
import { fullSize, size } from '../styles/rootStyle';
import VKLogin from 'react-native-vkontakte-login';
import { setTokenAndId } from '../redux/slices/profileSlice';


const Auth: React.FC = () => {

    const dispatch = useAppDispatch()

    const check = async ()=>{
        const isLoggedIn = await VKLogin.isLoggedIn();
    
        const auth = await VKLogin.login(['friends', 'photos', 'email']);
        if (auth?.access_token, isLoggedIn) {
          
          dispatch(setTokenAndId({token:auth.access_token, user_id:auth.user_id}))
        }
        
      }
    return <View
        style={styles.container}
    >
        <TouchableOpacity style={styles.btn} onPress={check}>
            <Image style={styles.icon} source={require('../assets/icons/vk.png')}/>
            <Text style={styles.text}>Авторизация</Text>
        </TouchableOpacity>
    </View>
}
export default Auth

const styles = StyleSheet.create({
    container:{
        width: fullSize.width,
        height: fullSize.height,
        alignItems:'center',
        justifyContent: 'center'
    },
    btn:{
        alignItems:'center',
        justifyContent:'center'
    },
    icon:{
        width:15*size,
        height:15*size,
        resizeMode:'stretch'
    },
    text:{
        fontSize:5*size,
        marginTop:2*size,
        color:'#7084cf'
    }
})

