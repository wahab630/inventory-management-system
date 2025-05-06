//dynamic we will generate 2 tokens access and refresh
import jwt from "jsonwebtoken";
import { PUBLIC_DATA } from "../constant.js";

export const generatetoken = (user, expire = "1d") => {
    const token = jwt.sign({ userId: user._id }, PUBLIC_DATA.jwt_auth, {
        expiresIn: expire
    })
    return token
}

export const validatetoken = (token) => {
    const tokens = jwt.verify(token, PUBLIC_DATA.jwt_auth)
    return tokens
}