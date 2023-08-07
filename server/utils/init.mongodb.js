import mongoose from "mongoose";

const connentDB  = async() => {
    return await new Promise((resolve, reject) => {
        mongoose
        .connect(process.env.URL_MONGODB)
        .then(() => resolve("connent DB done !"))
        .catch((err) =>{
            reject("connent error :: ",err);
        })
    })
}

export default connentDB



