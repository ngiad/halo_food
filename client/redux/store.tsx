import { configureStore } from "@reduxjs/toolkit";
import user from "./state"

export type userTP = {
    user : any
} 

export default configureStore({
    reducer : {
        user
    }
})