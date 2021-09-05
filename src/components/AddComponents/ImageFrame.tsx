import React, { useRef } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Image } from "react-native";
import { setPhoto } from "../../redux/slices/mediaSlice";
import { addUploadPhotoProgress, removeUploadPhoto, setInContainer, uploadPhotoType } from "../../redux/slices/rootSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { fullSize, size } from "../../styles/rootStyle";

const ImageFrame:React.FC<{photo:uploadPhotoType}> = ({photo}) => {
    const dispatch = useAppDispatch()
  const pan = useRef(new Animated.ValueXY({x:0,y:0})).current;
  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gesState)=>{
        
        return Animated.event([
            null,
            {
              dx: pan.x,
              dy: pan.y,
            }
          ], {useNativeDriver: false})(event, gesState)
    },
    onPanResponderRelease: (e) => {
        if(e.nativeEvent.pageY > fullSize.height*.62 )
        {
            dispatch(addUploadPhotoProgress({...photo, status:''}))
            dispatch(removeUploadPhoto(photo))}
        else
      Animated.spring(
        pan,
        { toValue: { x: 0, y: 0 },useNativeDriver:true },
        
      ).start();
    },
  });

  return (
   
      <Animated.View
        style={{...styles.box,
          transform: [{ translateX: pan.x }, { translateY: pan.y }]
        }}
        {...panResponder.panHandlers}
      ><Image source={{uri:photo.uri}} style={{width:25*size,height:25*size, resizeMode:'stretch'}}/>
      </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  titleText: {
    fontSize: 14,
    lineHeight: 24,
    fontWeight: "bold"
  },
  box: {
    height: 25*size,
    width: 25*size,
    margin:2*size,
    backgroundColor: "blue",
    borderRadius: 3*size,
    overflow:'hidden'
  }
});

export default ImageFrame;