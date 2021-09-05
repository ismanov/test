import {
    createSlice,
    configureStore,
    getDefaultMiddleware
  } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
  import createSagaMiddleware from "redux-saga";
import ProfileSlice from './slices/profileSlice'
import saga from "./saga";
import mediaSlice from "./slices/mediaSlice";
import rootSlice from "./slices/rootSlice";


let sagaMiddleware = createSagaMiddleware();
const middleware = [...getDefaultMiddleware({ thunk: false,immutableCheck: false,
    serializableCheck:false}), sagaMiddleware];



export const store = configureStore({
    reducer: {
        profileState: ProfileSlice,
        mediaState: mediaSlice,
        rootState: rootSlice

    },
    middleware
})
sagaMiddleware.run(saga);
export type RootState = ReturnType<typeof store.getState>
type AppDispatch = typeof store.dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
