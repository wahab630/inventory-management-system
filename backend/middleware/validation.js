import { validationResult } from "express-validator"
import { ApiError } from "../utils/utils.js"
import httpStatus from 'http-status';

export const Validation = (req, res, next) => {
    try {
        const result = validationResult(req)
        if (!result.isEmpty()) {
            //error in array get 
            throw new ApiError(httpStatus.BAD_REQUEST, result.array()[0].msg)
        }
        next()
    } catch (error) {
        next(error)
    }
}