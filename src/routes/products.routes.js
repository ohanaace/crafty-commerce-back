import { Router } from "express";
import { validateAuth } from "../middlewares/authValidation.middleware.js";
import { addProductCart, cartProductsList, checkout, deleteCart, deleteProductCart,
filterProductId, filterProductsType, modifyProductQuantity, orderSummary,
productsList } from "../controllers/products.controllers.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { cartSchema, checkoutSchema } from "../schemas/purchase.schemas.js";

const prodRouter = Router();

prodRouter.use(validateAuth);

prodRouter.get("/products", productsList);
prodRouter.get("/products/:type", filterProductsType);
prodRouter.get("/product/:id", filterProductId);
prodRouter.get("/cartProducts", cartProductsList);
prodRouter.post("/addProduct/:id", validateSchema(cartSchema),addProductCart);
prodRouter.get("/deleteProduct/:id", deleteProductCart);
prodRouter.post("/checkout", validateSchema(checkoutSchema), checkout);
prodRouter.get("/checkout", orderSummary);
prodRouter.get("/deleteCart", deleteCart);
prodRouter.get("/modifyProductQuantity/:type/:id", modifyProductQuantity);

export default prodRouter;