import React from 'react';
import { Image, Text, View } from 'react-native';
import { useAppSelector } from '../../redux/store';
import { fullSize, size } from '../../styles/rootStyle';

const Photo = () => {
    const {photo} = useAppSelector(s=>s.mediaState)
    const {first_name, last_name} = useAppSelector(s=>s.profileState)


    return <View>
        <View style={{width:'100%',height:fullSize.height*.56,alignItems:'center', justifyContent:'center'}}><Image style={{
            width:  '70%',
            height: fullSize.height*.5,
            resizeMode:'cover'
            }}  source={{uri: photo?.large_photo}}/></View>
            <View style={{ width: '100%', paddingLeft:4*size, paddingRight: 4*size, }}>
                <View style={{ flexDirection:'row', marginTop:size}}>
                    <Text style={{width:25*size, marginRight:4*size, fontSize:3.5*size, fontWeight:'bold'}}>File name</Text>
                    <Text style={{width:63*size, fontSize:3.5*size}}>{photo?.name}</Text>
                </View>
                <View style={{ flexDirection:'row', marginTop:size}}>
                    <Text style={{width:25*size, marginRight:4*size, fontSize:3.5*size, fontWeight:'bold'}}>Object name</Text>
                    <Text style={{width:63*size, fontSize:3.5*size}}>{`${first_name} ${last_name}`}</Text>
                </View>
                <View style={{ flexDirection:'row', marginTop:size}}>
                    <Text style={{width:25*size, marginRight:4*size, fontSize:3.5*size, fontWeight:'bold'}}>Caption</Text>
                    <Text style={{width:63*size, fontSize:3.5*size}}>{photo?.text}</Text>
                </View>
                <View style={{ flexDirection:'row', marginTop:size}}>
                    <Text style={{width:25*size, marginRight:4*size, fontSize:3.5*size, fontWeight:'bold'}}>Keywords</Text>
                    <View style={{width:63*size, flexDirection:'row'}}>{
                        photo?.has_tags? photo.has_tags.map((item, index)=><Text key={index} style={{backgroundColor: '#42a1c9', color:'white', padding:.5*size, marginRight:size, borderRadius:.2*size}}>{item}</Text> ): <Text/>
                    }</View>
                </View>
            </View>
    </View>
}
export default Photo