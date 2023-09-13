import express from "express"
import commentController from "../controllers/comment.controller.js"

const commentRouter = express.Router()

const { get, update, create, remove } = new commentController()

commentRouter.get("/:idPost",get)
commentRouter.put("/:idPost/:id",update)
commentRouter.get("/remove/:id",remove)
commentRouter.post("/create/:idPost",create)

export default commentRouter