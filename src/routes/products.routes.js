import { Router } from "express";
import { validateAuth } from "../middlewares/authValidation.middleware.js";

const prodRouter = Router();

prodRouter.use(validateAuth);

prodRouter.get("/products");
prodRouter.get("/products/:type");
prodRouter.get("/product/:id");
prodRouter.post("/checkout");

export default prodRouter;