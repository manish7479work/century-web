import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    value: null,
    phone: null
}

export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        addUser: (state, action) => {
            state.value = action.payload
        },
        addPhone: (state, action) => {
            state.phone = action.payload
        }
    },
})

export const { addUser, addPhone } = userSlice.actions

export default userSlice.reducer