import { Router } from "express";
import PostController from "../controllers/post.controller.js";
import { thisAdmin } from "../middlewares/thisAdmin.middleware.js";

const postRouter = Router()

const { createPost, removePost, getPost, updatePost, getParams, tag } = new PostController()

postRouter.post("/create",thisAdmin, createPost)
postRouter.put("/update/:id",thisAdmin, updatePost)
postRouter.delete("/remove/:id",thisAdmin, removePost)
postRouter.get("/",getPost)
postRouter.get("/tag",tag)
postRouter.get("/:id",getParams)



export default postRouter