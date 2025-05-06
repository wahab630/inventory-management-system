import httpStatus from 'http-status';
import { ApiError } from "../utils/utils.js";
import { validatetoken } from '../utils/token.utils.js';

export const Authentication = (req, res, next) => {
    try {
        const headers = req.headers["authorization"] || ""
        if (!headers || !headers.startsWith("Bearer")) {
            throw new ApiError(httpStatus.UNAUTHORIZED, "Please Login First")
        }
        const auth_token = headers.split(" ")[1]
        if(!auth_token){
            throw new ApiError(httpStatus.UNAUTHORIZED,"Please Provide Valid Token")
        }
        const data = validatetoken(auth_token)
        req.user = data.userid
        next()
    } catch (error) {
        next(error)
    }
}