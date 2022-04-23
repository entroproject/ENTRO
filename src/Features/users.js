import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    profile: {},
    isLoggedIn: true
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        loginUser: (state, action) => {
            state.profile = action.payload;
            state.isLoggedIn = true;
        },
        logoutUser: (state) => {
            state.isLoggedIn = false;
            state.profile= {}
        },
        updateUser: (state, action) => {
            state.profile = action.payload;
        }
    }
})

export const {loginUser, logoutUser}  = userSlice.actions

export default userSlice.reducer