import AuthService from "../services/authen.service.js";

export default class AuthController {
  constructor() {
    this.service = new AuthService();
  }

  register = async (req, res, next) => {
    try {
      res.status(200).json(await this.service.register(req.body));
    } catch (error) {
      res.status(401);
      next(error);
    }
  };

  login = async (req, res, next) => {
    try {
      console.log(req.headers.isadmin);
      res.status(200).json(await this.service.login(req.body));
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  loginStauts = async(req, res, next) => {
    try {
      res.status(201).json(await this.service.loginStauts(req.headers.token));
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  ForgotPassword = async (req, res, next) => {
    try {
        res.status(200).json(await this.service.ForgotPassword(req.query.email));
    } catch (error) {
      res.status(400);
      next(error);
    }
  };

  UpdatePassword = async (req,res,next) => {
    try {
        res.status(200).json(await this.service.UpdatePassword(req.body,req.params.id));
    } catch (error) {
      res.status(400);
      next(error);
    }
  }
}
