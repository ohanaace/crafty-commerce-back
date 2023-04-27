import { Router } from "express";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { logInSchema, signUpSchema } from "../schemas/auth.schemas.js";
import { logIn } from "../controllers/auth.controllers.js";

const userRouter = Router();

userRouter.post("/login", validateSchema(logInSchema), logIn);
userRouter.post("/sign-up", validateSchema(signUpSchema));
userRouter.post("/logout");

export default userRouter;