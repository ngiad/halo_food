import { combineReducers } from 'redux';
import user from "./state"

export type userTP = {
    user : any
} 

export default combineReducers({
    user    
})