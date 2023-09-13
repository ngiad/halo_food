import { Router } from "express";
import AuthController from "../controllers/authen.controller.js";

const authRouter = Router()

// authRouter.use()

const { register, login, loginStauts, ForgotPassword, UpdatePassword } = new AuthController()


authRouter.post("/register",register)
authRouter.post("/login",login)
authRouter.post("/update/:id",UpdatePassword)
authRouter.get("/stauts",loginStauts)
authRouter.get("/forgot", ForgotPassword)

export default authRouter