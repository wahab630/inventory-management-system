import { body } from "express-validator";

export class AuthValidation {
    static RegisterUser = [
        body("name").notEmpty().withMessage("Name cannot be empty"),
        body("email").notEmpty().withMessage("Email cannot be empty")
            .isEmail().withMessage("Email must be valid"),
        body("password").isLength({ min: 6 }).withMessage("Password must be greater than 6 characters").notEmpty().withMessage("Password is required")
    ];
    static LoginUser = [
        body("email").notEmpty().withMessage("Email cannot be empty")
            .isEmail().withMessage("Email must be valid"),
        body("password").isLength({ min: 6 }).withMessage("Password must be greater than 6 characters").notEmpty().withMessage("Password is required")
    ];
}
