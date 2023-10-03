import { Router } from "express";
import { protect } from "../middlewares/authen.middleware.js";
import ProfileController from "../controllers/profile.controller.js";
import postRouter from "./post.router.js";

const profileRoter = Router()

const { getSave, addSave,saveStatus } = new ProfileController()
profileRoter.use(protect)


profileRoter.get("/",getSave)
profileRoter.get("/saveStatus", saveStatus)
profileRoter.post("/addsave", addSave)



export default profileRoter