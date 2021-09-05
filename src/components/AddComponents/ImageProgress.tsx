import React, { useEffect, useRef, useState } from "react";
import { Animated, View, StyleSheet, PanResponder, Text, Image } from "react-native";
import { setPhoto } from "../../redux/slices/mediaSlice";
import { addUploadPhotoProgress, changeStatus, removeUploadPhoto, setInContainer, uploadPhotoProgressType, uploadPhotoType } from "../../redux/slices/rootSlice";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getResource } from "../../REST/api";
import { uploadStyle } from "../../styles/AddStyles/uploadStyle";
import { fullSize, size } from "../../styles/rootStyle";

const ImageProgress:React.FC<{photo:uploadPhotoProgressType}> = ({photo}) => {
    const dispatch = useAppDispatch()
    const {token} = useAppSelector(state=>state.profileState)
    const {album_id} = useAppSelector(state=>state.rootState)

    const [progress, setProgress] = useState(0)
    const [st, setSt] = useState('start')
    useEffect(() => {
        if(photo.status === '' )sendData(photo)
        
    }, []);
    const sendData = async( data:uploadPhotoType) => {
        dispatch(changeStatus({...data,status:'uploading'}))

        const formData  = new FormData();
      
          formData.append('file1', {
            uri: data.uri,
            type: data.type,
            name: data.fileName,
          });
      
        fetch(`https://api.vk.com/method/photos.getUploadServer?v=5.51&access_token=${token}&album_id=${album_id}`).then(res=>{
            
            if(res.status === 200) return res.json()
            else throw new Error()
        }).then(res=>{
            setProgress(.3)
            
            uploadPhoto(res.response.upload_url,formData)
        }).catch(e=>{
            dispatch(changeStatus({...photo, status:'error'}))
            setSt('err')
            console.log(e)})
        
      }
      const uploadPhoto = (url:string,formData:any)=>{
    
          fetch(url,{
            method: 'POST',
            body: formData,
            
            
          }).then(r=>r.json()).then(res=>{
              setProgress(.7)
              
              getResource('photos.save',{album_id,server:res.server,photos_list: res.photos_list,hash:res.hash,access_token:token,v:5.52})
              .then(res=>{
                  setProgress(1)
                dispatch(changeStatus({...photo, status:'uploaded'}))  
                setSt('success')
                }
              ).catch(e=>{
                dispatch(changeStatus({...photo, status:'error'}))
                setSt('err')
                console.log(e);
                
              })
          }).catch(e=>{
            dispatch(changeStatus({...photo, status:'error'}))
            setSt('err')  
            console.log(e)})
      }
  return (
   
      <View
        style={{...styles.box}}>
            <Image source={{uri:photo.uri}} style={{width:25*size,height:25*size,borderRadius: 3*size, resizeMode:'stretch'}}/>
            {photo.status==='uploaded'|| photo.status==='error' ? 
             <View style={styles.statusBar}>
                <Text style={{fontSize:2*size}}>{photo.status==='uploaded'?'✅':'⚠️'}</Text>
            </View>
            :<View style={st==='start'?styles.progressBar:styles.statusBar}>
                {st==='start'?<View style={{...styles.progress, width: progress*25*size}}/>:<Text style={{fontSize:2*size}}>{st==='success'?'✅':'⚠️'}</Text>}
            </View>}
      </View>
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
    height: 30*size,
    width: 25*size,
    margin:2*size,
    overflow:'hidden'
  },
  progressBar:{
      backgroundColor:'white',
      height: 4 *size,
      width:25*size,
      marginTop:size,
      borderWidth:.3*size,
      overflow:'hidden'
  },
  progress:{
    backgroundColor:'#52e357',
    height: 4 *size,
  },
  statusBar:{
    height: 4 *size,
    width:25*size,
    marginTop:size,
    borderWidth:.3*size,
    overflow:'hidden',
    alignItems:'center',
    justifyContent:'center'
  }
});

export default ImageProgress;