import User from "../models/userSchema.js";
import bcrypt from "bcryptjs";
import httpStatus from 'http-status';
import "dotenv/config";
import jwt from "jsonwebtoken";
import { catchAsync } from "../utils/catchAsync.js";
import { AuthService } from "../services/Auth.service.js";

export const registerNewUser = async (req, res, next) => {
  try {
    let newUser = req.body;
    newUser.password = await bcrypt.hash(newUser.password, 10);
    const user = await User.create(newUser); // frontend se request ae bus password hash kr k DB ma store
    res.json({
      user,
      message: "user has been registered successfully",
      success: true,//response obj ma success b bhejta toaster k lia
    });
  } catch (error) {
    next(error);
  }
};

export const loginUser = async (req, res, next) => {
  try {
    let { email, password } = req.body;

    if (!email) { //first check provide na kre to error return kro
      return next(new Error("please provide valid email or username"));
    }
    if (!password) {
      return next(new Error("please provide password"));
    }
    const user = await User.findOne({ email: email });//is single entry email wala user DB ma exist b krta ya nai

    if (!user) { // exist na kre to error return
      return next(
        new Error(`${email} is not found please create account and try again`)
      );
    }
    //2nd check password
    const isPasswordMatched = await bcrypt.compare(password, user.password); // true or false return
    if (!isPasswordMatched) {
      return next(new Error("your password is incorrect please try again"));
    }
    //jb sab ok ho jae to jwt krna he
    //JWT
    const token = await jwt.sign({ payload: user }, process.env.JWT_SECRET, {
      expiresIn: "10h", // token expire kr re// ise dekhna ??? sahi kia ya galt kia
    });
    // khud ui se auto logout ho jae// middleware ko pata lag jata ha wo internally
    res.cookie("token", token, {
      expires: new Date(Date.now() + 9000000), //cookie expire kr re
      httpOnly: true,
      secure: true,
      SameSite: "None" //ye abi add kia
    })
      .status(200).json({
        user,
        token,
      });
  } catch (error) {
    next(error);
  }
};

export const logoutUser = (req, res, next) => {
  // 2 kam krna ha//first jo cookie set ki the use expire kre
  res.cookie("token", "", { expires: new Date(Date.now()) }).json({
    message: "logged out",
  }); //empty string pass krna se token expire ho jata forun kyunka key value set to 0 ha but extra flag
  // cookie ko delete kr re
};

export class AuthController {

  static RegisterUser = catchAsync(async (req, res) => {
    const res_obj = await AuthService.RegisterUser(req.body)
    res.status(httpStatus.CREATED).send(res_obj)
  })//static for class members//catchasync for api error

  static LoginUser = catchAsync(async (req, res) => {
    const res_obj = await AuthService.LoginUser(req.body)
    res.status(httpStatus.OK).send(res_obj)
  })

  static ProfileController = catchAsync(async (req, res) => {
    const res_obj = await AuthService.ProfileService(req.user)
    res.status(httpStatus.OK).send(res_obj)
  })

}