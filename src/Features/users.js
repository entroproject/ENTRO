import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    user: {
        firstname: "Godwin"
    },
    auth: null
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.user = action.payload;
        },
        logoutUser: (state) => {
            state.auth = null;
            state.user= {}
        },
        updateUser: (state, action) => {
            state.user = action.payload;
        }
    }
})

export const {loginUser, logoutUser}  = userSlice.actions

export default userSlice.reducer