import { Schema, model } from "mongoose";
import bcrypt from "bcryptjs"

const userSchema = Schema({
    name : {
        type : String,
        required : [true, "Please add your name"]
    },
    email : {
        type : String,
        required : true,
        unique : true,
        trim : true,
        match : [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid emaial"
        ]
    },
    password : {
        type :  String,
        require : [true, "Please add your password"],
        minlength : [6, " Password must be up to 6 characters"],
        // maxlength : [25," Password must not be up more than 25 characters"]
    },
    photo : {
        type :  String,
        default : "https://i.ibb.Co/4pDNDk1/avatar.png"
    },
    admin : {
        type : Boolean,
        default :  false
    }
},{
    timestamps :  true
})

userSchema.pre("save",async function(next){
    if(!this.isModified("password")){
        return next()
    }
    
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(this.password, salt)
    this.password = hashedPassword
    next()
})


export default model("userfood",userSchema)