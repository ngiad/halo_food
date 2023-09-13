import commentModel from "../models/comment.model.js"

export default class commnentSerrvice{
    constructor(){
        this.model = commentModel
    }

    get = (idPost,page, size = 12) => {
        return new Promise(async(resolve, reject) => {
            try {
                const comment = await this.model.find({idPost}).skip(size*page).limit(size)
                resolve(comment)
            } catch (error) {
                reject(error)
            }
        })
    }

    update = (id,comment) => {
        return new Promise(async(resolve, reject) => {
            try {
                const UpdateComment = await this.model.findOneAndUpdate({_id : id},{comment},{new : true})
                resolve(UpdateComment)
            } catch (error) {
                reject(error)
            }
        })
    }

    create = (idPost,{idUser,comment}) => {
        return new Promise(async(resolve, reject) => {
            try {
                await this.model.create({idPost,idUser,comment})
                resolve({complete : true})
            } catch (error) {
                reject(error)
            }
        })
    }

    remove = (id) => {
        return new Promise(async (resolve, reject) => {
            try {
                await this.model.findOneAndRemove({_id : id})
                resolve({complete : true})
            } catch (error) {
                reject(error)
            }
        })
    }
}