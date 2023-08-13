import mongoose, { Schema, model } from "mongoose";


const saveModel = Schema({
    iduser : {
        type : String,
        required :  true
    },
    idPost : {
        type : String,
        required :  true
    }
},{
    timestamps :  true
})


export default model("savepost",saveModel)