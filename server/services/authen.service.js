import userModel from "../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { createTransport } from "nodemailer";

export default class AuthService {
  constructor() {
    this.model = userModel;
  }

  generateToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
  };

  sendEmail = async (email, id) => {
    try {
      const transporter = createTransport({
        service: "Gmail",
        auth: {
          user: "devwebdainghia@gmail.com",
          pass: "_aampknaozdbfzoez"
        },
      });

      await transporter.sendMail({
        from: "devwebdainghia@gmail.com",
        to: `${email}`,
        subject: "Forgot Password",
        text: `Forgot Password at url ${
          "http://localhost:3000/forgot?id=" + id
        }`,
      })
    } catch (error) {
      throw error;
    }
  };

  verify = (token, signature) => {
    return jwt.verify(token, signature);
  };

  passwordIsCorrect = async (passwordHash, userPassWord) =>
    await bcrypt.compare(passwordHash, userPassWord);

  register = async ({ name, email, password }) => {
    try {
      if ((!name, !email, !password)) 
        throw new Error("Please fill in all required fields");
      if (password.length > 6)
        throw new Error("Password must be up to 6 characters");

      const userExist = await this.model.findOne({ email });
      if (userExist) throw new Error("Email has already been registered");
      else {
        const user = await this.model.create({
          name,
          email,
          password,
        });

        const token = this.generateToken(user["_id"]);
        if (user) {
          const { _id, name, email, photo, admin } = user;
          return { _id, name, email, photo, admin, token };
        } else {
           throw new Error("Invalid user data");
        }
      }
    } catch (error) {
         throw error;
    }
  };

  login = async ({ email, password }) => {
    try {
      if (!email || !password)
        throw new Error("Please fill in all required fields");
      if (password.length < 6)
        throw new Error("Password must be up to 6 characters");

      const userLogin = await this.model.findOne({ email });
      if (!userLogin) throw new Error("User not found,please signup");

      const passwordIsCorrect = await this.passwordIsCorrect(
        password,
        userLogin.password
      );

      if (userLogin && passwordIsCorrect) {
        const token = this.generateToken(userLogin["_id"]);
        const { _id, name, email, photo, admin } = userLogin;

        return { _id, name, email, photo, admin, token };
      }else{
        throw new Error("Password is not correct!")
      }
    } catch (error) {
      throw error;
    }
  };

  loginStauts = ({ token }) => {
    try {
      if (!token) {
        return { status: false };
      }

      const verified = this.verify(token, process.env.JWT_SECRET);

      if (!verified) {
        throw new Error("User not found");
      } else {
        return { status: true };
      }
    } catch (error) {
      throw error;
    }
  };

  ForgotPassword = async (email) => {
    try {
      const userForgot = await this.model.findOne({ email });
      if (!userForgot) throw new Error("User not found !");
      else {
        await this.sendEmail(email, JSON.stringify(userForgot["_id"]));
      }
      return { complete: true };
    } catch (error) {
      throw error;
    }
  };

  UpdatePassword = async ({newPassword, confirmPassword}, id) => {
    try {
      if (!(newPassword === confirmPassword))
        throw new Error("Check confirm password");

      const user = await userModel.findById({ _id : id });
      if(!user) throw new Error("User not found");

      Object.assign(user, {
        ...user,
        password: newPassword,
      });
  
      user.save();

      const token = this.generateToken(user["_id"])
      const { _id, name, email, photo, admin  } = user
      return  { _id, name, email, photo, admin, token }
    } catch (error) {
      throw error;
    }
  };
}
