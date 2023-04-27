import joi from "joi"

export const logInSchema = joi.object({
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});

export const signUpSchema = joi.object({
    name: joi.string().required(),
    email: joi.string().email().required(),
    password: joi.string().min(5).required()
});