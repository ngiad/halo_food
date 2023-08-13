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
    tag :  [String]
},{
    timestamps :  true
})


export default model("postfood",PostSchema)