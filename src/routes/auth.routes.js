import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { logInSchema, signUpSchema } from "../schemas/auth.schemas.js";

const userRouter = Router();

userRouter.post("/login", validateSchema(logInSchema));
userRouter.post("/sign-up", validateSchema(signUpSchema));
userRouter.post("/logout");

export default userRouter;