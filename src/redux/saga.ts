import { toast } from './../utils/constants';
import { RootState } from './store';
import { getResource } from './../REST/api';
import { call, takeEvery, put , select} from "redux-saga/effects";
import { ProfileType, setFirstAndLastName } from "./slices/profileSlice";
import { sagaActions } from './sagaActions';
import { setAlbums, setCount, albumType, setAlbum, setPhotos, photosType, photoType } from './slices/mediaSlice';
import { parseName } from '../utils/helpers';

export type resType = { response : {items :
  Array<{
    id:string; photo_130:string; photo_604: string; text: string; has_tags:string[]
  }>
  }

}



export function* getUserData() {
  try {
    const items:ProfileType = yield select((item:RootState)=>item.profileState);
    let {response}:{response:Array<{first_name:string, last_name:string}>}= yield call(() =>getResource('users.get',{user_ids:items.user_id,access_token:items.token,v:5.52})
    );
    console.log(response);
    
    yield put(setFirstAndLastName(response[0]));
  } catch (e) {
    console.log(e);
    
    toast(JSON.stringify(e))
  }
}

export function* getAlbums() {
    type ResType = {id:string;title:string;size:number, created:number}
  try {
    const items:ProfileType = yield select((item:RootState)=>item.profileState);
    let {response}:{response:{items:ResType[]; count:number} }= yield call(() =>getResource('photos.getAlbums',{owner_id:items.user_id,access_token:items.token,v:5.52}));
    yield put(setAlbums(response.items.map((item:ResType)=>({id:item.id, title:item.title, size: item.size, date:item.created}))))
    yield put(setCount(response.count))
  } catch (e) {
    toast(JSON.stringify(e))
  }
}
export function* getAlbum(action:{payload:albumType;func?:()=>void; type:string}) {
    
  try {
    const items:ProfileType = yield select((item:RootState)=>item.profileState);

    let res: resType  = yield call(() =>getResource('photos.get',{owner_id:items.user_id,album_id:action.payload.id,access_token:items.token,v:5.52}));
    const photos =  res?.response?.items
    if(photos && photos.length)
    {
      yield put(setPhotos(photos.map((item)=>({id:item.id, name:parseName(item.photo_130),small_photo:item.photo_130,large_photo:item.photo_604, text:item.text,has_tags: item.has_tags }))))
      yield put(setAlbum(action.payload))
  }
    else toast('⚠️')
  } catch (e) {
    toast(JSON.stringify(e))
  } finally{
    action?.func && action.func() 
  }
}
export function* getLazyPhoto(action:{payload:string,type:string}) {
    
  try {
    const items:ProfileType = yield select((item:RootState)=>item.profileState);
    const album:photoType[] = yield select((item:RootState)=>item.mediaState.photos);

    let res: resType  = yield call(() =>getResource('photos.get',{owner_id:items.user_id,album_id:action.payload, offset:album.length ,access_token:items.token,v:5.52}));
    const photos =  res?.response?.items
    console.log(res);
    
    if(photos && photos.length)
    {
      yield put(setPhotos([...album, ...photos.map((item)=>({id:item.id, name:parseName(item.photo_130),small_photo:item.photo_130,large_photo:item.photo_604, text:item.text,has_tags: item.has_tags }))]))
  }
    else toast('⚠️')
  } catch (e) {
    toast(JSON.stringify(e))
  }
}

export default function* saga() {
  yield takeEvery(sagaActions.GET_DATA, getUserData);
  yield takeEvery(sagaActions.GET_ALBUMS, getAlbums);
  yield takeEvery(sagaActions.GET_ALBUM, getAlbum);
  yield takeEvery(sagaActions.GET_LAZY_PHOTO, getLazyPhoto);
}
