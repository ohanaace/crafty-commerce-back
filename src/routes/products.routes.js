import { Router } from "express";
import { validateAuth } from "../middlewares/authValidation.middleware.js";
import { addProductCart, cartProductsList, checkout, deleteProductCart, filterProductId, filterProductsType, modifyProductQuantity, productsList } from "../controllers/products.controllers.js";

const prodRouter = Router();

prodRouter.use(validateAuth);

prodRouter.get("/products", productsList);
prodRouter.get("/products/:type", filterProductsType);
prodRouter.get("/product/:id", filterProductId);
prodRouter.get("/cartProducts", cartProductsList);
prodRouter.post("/addProduct", addProductCart);
prodRouter.post("/deleteProduct", deleteProductCart);
prodRouter.post("/checkout", checkout);
prodRouter.post ("/modifyProductQuantity/:type", modifyProductQuantity);

export default prodRouter;