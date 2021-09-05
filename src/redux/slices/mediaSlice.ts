import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type albumType = {
    id:string;
    title: string;
    size:number;
    date:number;
}
export type photoType = {
    id:string;
    name: string;
    text:string;
    small_photo:string;
    large_photo:string;
    has_tags?: string[];
}
export type photosType = {
  
}

type mediaType ={
    albums: albumType[]| null;
   album:albumType|null;
   photos: photoType[]|null;
   photo: photoType|null;
   count:number
}

const initialState:mediaType = {
   albums:null,
   album:null,
   photos:null,
   photo:null,
   count:0
}

const mediaSlice = createSlice({
    name: 'media',
    initialState,
    reducers: {
        setAlbums: (state, action: PayloadAction<albumType[]|any>) => {
            state.albums = action.payload
        },
        setAlbum: (state, action: PayloadAction<albumType|null>) => {
            state.album = action.payload
        },
        setPhotos: (state, action: PayloadAction<photoType[]|null>) => {
            state.photos = action.payload
        },
        setPhoto: (state, action: PayloadAction<photoType|null>) => {
            state.photo = action.payload
        },
        setCount: (state, action: PayloadAction<number>) => {
            state.count = action.payload
        },

    }})

    export const {setAlbum, setAlbums, setPhoto, setPhotos , setCount} = mediaSlice.actions
export default mediaSlice.reducer