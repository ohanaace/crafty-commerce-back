import { Router } from "express";
import { validateAuth } from "../middlewares/authValidation.middleware.js";
import { addProductCart, cartProductsList, checkout, deleteProductCart, filterProductId, filterProductsType, modifyProductQuantity, productsList } from "../controllers/products.controllers.js";
// import { validateSchema } from "../middlewares/schemaValidation.js";
// import { addProductCartSchema, checkoutSchema, deleteProductCartSchema } from "../schemas/purchase.schema.js";

const prodRouter = Router();

prodRouter.use(validateAuth);

prodRouter.get("/products", productsList);
prodRouter.get("/products/:type", filterProductsType);
prodRouter.get("/product/:id", filterProductId);
prodRouter.get("/cartProducts", cartProductsList);
prodRouter.post("/addProduct/:id", addProductCart);
prodRouter.get("/deleteProduct/:id", deleteProductCart);
prodRouter.post("/checkout", checkout);
prodRouter.get("/modifyProductQuantity/:type/:id", modifyProductQuantity);

export default prodRouter;