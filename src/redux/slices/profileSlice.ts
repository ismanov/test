import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type ProfileType = {
    token: string | null;
    user_id: string | null;
    first_name: string | null;
    last_name: string | null
}

const initialState:ProfileType = {
    token: null,
    user_id: null,
    first_name: null,
    last_name: null,
}

const ProfileSlice = createSlice({
    name: 'profile',
    initialState,
    reducers: {
        setTokenAndId: (state, action: PayloadAction<{token:string|null; user_id: string|null}>) => {
                state.token = action.payload.token
                state.user_id = action.payload.user_id
            },
        setFirstAndLastName: (state, action: PayloadAction<{first_name:string|null; last_name: string|null}>) => {
                state.first_name = action.payload.first_name
                state.last_name = action.payload.last_name
            },

    }})

    export const { setTokenAndId,setFirstAndLastName} = ProfileSlice.actions
export default ProfileSlice.reducer