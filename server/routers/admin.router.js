import { Router } from "express";
import AdminController from "../controllers/admin.controller.js";
import { protect } from "../middlewares/authen.middleware.js";

const adminRouter = Router()

adminRouter.use(protect)
const { get } = new AdminController()

adminRouter.get("/get",get)



export default adminRouter