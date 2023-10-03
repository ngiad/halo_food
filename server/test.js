import connentDB from "./utils/init.mongodb.js";
import userModel from "./models/user.model.js";
import Postfood from "./models/post.model.js";
import mongoose from "mongoose";

// async function test(){
//     // const user = await userModel.findOne({_id : "64d8fb9e4006ad2917506849"})

//     //   Object.assign(user,{...user, password : "nghia1_23"})

//     // await user.save()

//     // console.log(user);
//     const query = {
//         email: {$in : [ 'trandainghia127@gmail.com', 'test123@gmail.com' ]}
//       }
//     const user = await userModel.find(query)
    
//     console.log(user)
  
// }
mongoose.connect("mongodb+srv://Ngiad:Ngiad001@cluster0.2ts8aja.mongodb.net/").then(() => console.log("ok"))


const test = async() => {
  return new Promise((resolve ,reject) => {
    userModel.find().then((data) => resolve(data)).catch((err) => reject(err))
  }) 
}

export default async function getUniqueTags() {
  try {
    const uniqueTags = await Postfood.distinct('tag');
    console.log(uniqueTags);
    return uniqueTags
  } catch (error) {
    console.error(error);
  } 
}

getUniqueTags();
// async function name() {
//   try {
//     const res = await test()
//     console.log("ok :: ",res);
//   } catch (error) {
//     console.log("err :: ",error);
//   }
// }