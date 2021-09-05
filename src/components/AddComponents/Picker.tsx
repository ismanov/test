import React, { useEffect, useRef, useState } from 'react';
import { Animated, ScrollView, Text, TouchableOpacity, View } from 'react-native';
import { albumType } from '../../redux/slices/mediaSlice';
import { pickerStyle } from '../../styles/AddStyles/pickerStyle';
import { fullSize, size } from '../../styles/rootStyle';

type PropType = {
    value?:albumType;
    list?: albumType[]|null;
    style: StyleMedia,
    label: (item:albumType)=>string
    onChange:(value:albumType)=>void
}

const Picker: React.FC<PropType> = (props)=> {

    const [show, setShow] = useState(false)
    const [value, setValue] = useState<albumType|null>( (props.list? props.list[0]: null))

    const height = useRef(new Animated.Value(0)).current

    useEffect(() => {
        Animated.timing(height, {
            toValue: show?fullSize.height*.4:0,
            duration: 300,
            useNativeDriver:false
          }).start();
    }, [show]);

    useEffect(()=>{
        setShow(false)
        if(value) props.onChange(value)
    },[value])

    return <View style={props.style}>
        <TouchableOpacity onPress={()=>setShow(prev=>!prev)} style={pickerStyle.select} activeOpacity={.8}>
            {value?<Text style={pickerStyle.name}>{props.label(value)}</Text>:<Text/>}
            <Text style={{...pickerStyle.name,transform:[{rotate:90*(show?-1:1)+'deg'}]}}>‣</Text>
        </TouchableOpacity>
        <Animated.View style={{...pickerStyle.body, height}}>
            <ScrollView style={{...pickerStyle.body,borderWidth:.4*size}}>
                {
                    props.list?.map((item,index)=><TouchableOpacity key={index} onPress={()=>setValue(item)} style={pickerStyle.optionStyle}>
                    <Text style={pickerStyle.label}>{props.label(item)}</Text>
                </TouchableOpacity>)
                }
            </ScrollView>
        </Animated.View>
    </View>
}

export default Picker;