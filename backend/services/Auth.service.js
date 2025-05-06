import { Profile, User } from "../models/index.js";
import httpStatus from 'http-status';
import { ApiError } from "../utils/utils.js";
import { generatetoken } from "../utils/token.utils.js";

export class AuthService {
    static async RegisterUser(body) {
        const { email, password, name } = body
        const checkExist = await User.findOne({ email })
        if (checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User Already registered")
        }
        const user = await User.create({ email, password, name })
        const token = generatetoken(checkExist)
        const refresh_token = generatetoken(user,"2d")
        await Profile.create({ user: user._id,refresh_token })
        return { msg: "User registered successfully", token: token}
    }
    static async LoginUser(body) {
        const { email, password } = body
        const checkExist = await User.findOne({ email })
        if (!checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User Not registered")
        }
        if (password !== checkExist.password) {
            throw new ApiError(httpStatus.BAD_REQUEST, "Invalid Credentials")
        }
        const token = generatetoken(checkExist)
        return { msg: "User login successfully", token: token }
    }
    static async ProfileService(user) {
        const checkExist = await User.findById(user).select("name email")
        if (!checkExist) {
            throw new ApiError(httpStatus.BAD_REQUEST, "User Not registered")
        }        
        const token = generatetoken(checkExist)
        return { msg: "Data fetched", user: checkExist }
    }
}