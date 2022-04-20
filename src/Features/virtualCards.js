import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    cards: [],
    defaultCard: ""
}

export const virtualCardSlice = createSlice({
    name: "virtualcards",
    initialState,
    reducers: {
        addCard: (state, action) => {
            state.cards = action.payload;
        },
        setDefaultCard: (state, action) => {
            state.defaultCard = action.payload
        }
    }
})

export const {addCard, setDefaultCard}  = virtualCardSlice.actions

export default virtualCardSlice.reducer