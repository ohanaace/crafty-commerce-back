import { Router } from "express";
import { validateAuth } from "../middlewares/authValidation.middleware.js";
import { filterProductId, filterProductsType, productsList } from "../controllers/products.controllers.js";

const prodRouter = Router();

prodRouter.use(validateAuth);

prodRouter.get("/products", productsList);
prodRouter.get("/products/:type", filterProductsType);
prodRouter.get("/product/:id", filterProductId);
prodRouter.post("/checkout");

export default prodRouter;