import { toast } from './../../utils/constants';
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type uploadPhotoType = {uri:string; fileName:string;type?:string}
export type uploadPhotoProgressType = {uri:string; fileName:string;type?:string;status:string}
export type RootType = {
    path: string;   
    uploadPhotos: uploadPhotoType[];
    uploadPhotosProgress:uploadPhotoProgressType [];
    inContainer:boolean;
    album_id?: string|null
}

const initialState:RootType = {
    path: 'media/',
    uploadPhotos: [],
    uploadPhotosProgress:[],
    inContainer:false,
    album_id:null
}

const rootSlice = createSlice({
    name: 'root',
    initialState,
    reducers: {
        setPath: (state, action: PayloadAction<string>) => {
                state.path = action.payload
            },
        setAlbumId: (state, action: PayloadAction<string>) => {
                state.album_id = action.payload
            },
        goBack: (state) => {
            if(state.path.split('/').length > 1)
               state.path = state.path.split('/').slice(0,-1).join('/')
            },
            addUploadPhoto: (state, action: PayloadAction<uploadPhotoType>) => {
                const check = state.uploadPhotos.find(item=>item.uri === action.payload.uri)
                if(check) toast('вы уже добавили это фото')
                else state.uploadPhotos = [...state.uploadPhotos, action.payload]
            },
            removeUploadPhoto: (state, action: PayloadAction<uploadPhotoType>) => {
                state.uploadPhotos = state.uploadPhotos.filter(item=>item.uri !== action.payload.uri)
            },
            addUploadPhotoProgress: (state, action: PayloadAction<uploadPhotoProgressType>) => {
                state.uploadPhotosProgress = [...state.uploadPhotosProgress, action.payload]
            },
            removeUploadPhotoProgress: (state, action: PayloadAction<uploadPhotoProgressType>) => {
                state.uploadPhotosProgress = state.uploadPhotosProgress.filter(item=>item.uri !== action.payload.uri)
            },
            changeStatus: (state, action: PayloadAction<uploadPhotoProgressType>) => {
                state.uploadPhotosProgress.forEach((item,index)=>{
                    if(item.uri === action.payload.uri){
                        state.uploadPhotosProgress[index] = action.payload
                    }
                })
            },
            setInContainer: (state, action: PayloadAction<boolean>) => {
                state.inContainer = action.payload
            },

    }})

    export const { setPath, changeStatus,setAlbumId, goBack,addUploadPhoto,setInContainer,removeUploadPhoto,addUploadPhotoProgress,removeUploadPhotoProgress} = rootSlice.actions
export default rootSlice.reducer

