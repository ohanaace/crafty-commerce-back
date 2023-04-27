import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { logInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { logIn, signUp } from "../controllers/auth.controllers.js";

const userRouter = Router();

userRouter.post("/login", validateSchema(logInSchema), logIn);
userRouter.post("/signup", validateSchema(signUpSchema), signUp);
userRouter.post("/logout");

export default userRouter;