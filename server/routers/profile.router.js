import { Router } from "express";
import { protect } from "../middlewares/authen.middleware.js";
import ProfileController from "../controllers/profile.controller.js";

const profileRoter = Router()

const { getSave, addSave } = new ProfileController()


profileRoter.use(protect)


profileRoter.get("/",getSave)
profileRoter.post("/addsave", addSave)


export default profileRoter