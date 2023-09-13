import mongoose, { Schema, model } from "mongoose";


const PostSchema = Schema({
    namePost : {
        type : String,
        required :  true
    },
    content : [{p : {type : String}, image : {type : String}}],
    athor : {
        type : String,
        default : "anonymous"
    },
    tag :  [String],
    status : {type : String, default : "new"},
    view : {
        type : Number,
        default : 0
    }
},{
    timestamps :  true
})


export default model("postfood",PostSchema)