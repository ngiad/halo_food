import mongoose, { Schema, model } from "mongoose";


const commentModel  = Schema({
    idPost : {
        type : String,
        required : true
    },
    comment : {
        type : String,
        required :  true
    },
    idUser : {
        type : String,
        required :  true
    }
},{
    timestamps :  true
})

export default model("commentPost",commentModel)