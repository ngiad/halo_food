import { createSlice } from "@reduxjs/toolkit"


export const user = createSlice({
    name : "user",
    initialState : {},
    reducers : {
        update : (state,action) => {
            return { ...action.payload}
        }
    }
})


export const { update } = user.actions

export default user.reducer