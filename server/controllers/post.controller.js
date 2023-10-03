import PostService from "../services/post.service.js";

export default class PostController{
    constructor(){
        this.sevicer = new PostService()
    }

    tag = async(req,res,next) => {
        try {
            res.status(200).json(await this.sevicer.tag())
        } catch (error) {
            res.status(400)
            next(error)
        }
    }


    createPost = async(req,res,next) => {
        try {
            res.status(200).json(await this.sevicer.createPost(req.body))
        } catch (error) {
            res.status(400)
            next(error)
        }
    }

    removePost = async(req,res,next) => {
        try {
            res.status(201).json(await this.sevicer.removePost(req.params.id))
        } catch (error) {
            res.status(400)
            next(error)
        }
    }


    getPost = async(req,res,next) => {
        try {
            res.status(200).json(await this.sevicer.getPost(req.query))
        } catch (error) {
            res.status(400)
            next(error)                                                                                                            
        }
    }


    updatePost = async(req,res,next) => {
        try {
            res.status(200).json(await this.sevicer.updatePost(req.params.id,req.body))
        } catch (error) {
            res.status(400)
            next(error) 
        }
    }

    getParams = async(req,res,next) => {
        try {
            res.status(200).json(await this.sevicer.getParams(req.params.id))
        } catch (error) {
            res.status(400)
            next(error) 
        }
    }
}