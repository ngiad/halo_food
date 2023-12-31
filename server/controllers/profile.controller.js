import ProfileService from "../services/profile.service.js";

export default class ProfileController{
    constructor(){
        this.service = new ProfileService()
    }

    getSave = async(req,res,next) => {
        try {
            res.status(200).json(await this.service.getSave(req.user["_id"],req.query)) 
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    addSave = async(req,res,next) => {
        try {
            res.status(200).json(await this.service.addSave(req.body))
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    saveStatus = async(req,res,next) => {
        try {
            res.status(200).json(await this.service.saveStatus(req.query))
        } catch (error) {
            res.status(400)
            next(error)
        }
    }
}