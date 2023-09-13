import userModel from "../models/user.model.js";
import saveModel from "../models/save.model.js";

export default class ProfileService{
    constructor(){
        this.userModel = userModel
        this.saveModel = saveModel
    }

    getSave = async ({size = 12,page = 0}) => {
        try {
            return await this.saveModel.find().skip(page*size).limit(size)
        } catch (error) {
            throw error
        }
    }

    addSave = async({idUser,idPost}) => {
        try {
           const saveExist = await this.saveModel.findOne({idUser,idPost})
           if(saveExist){
                await saveExist.remove()
           }else{
            await this.saveModel.create({idUser,idPost}) 
           }
           return { complete : true }
        } catch (error) {
            throw error
        }
    }

}