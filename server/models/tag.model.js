import mongoose, { Schema, model } from "mongoose";


const tagSchema = Schema({
    tag : String
},{
    timestamps :  true
})


export default model("tagfood",tagSchema)