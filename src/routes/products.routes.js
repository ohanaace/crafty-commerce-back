import { Router } from "express";
import { validateAuth } from "../middlewares/authValidation.middleware.js";
import { addProductCart, cartProductsList, checkout, deleteProductCart, filterProductId, filterProductsType, modifyProductQuantity, productsList } from "../controllers/products.controllers.js";
import { validateSchema } from "../middlewares/schemaValidation.js";
import { addProductCartSchema, checkoutSchema, deleteProductCartSchema } from "../schemas/purchase.schema.js";

const prodRouter = Router();

prodRouter.use(validateAuth);

prodRouter.get("/products", productsList);
prodRouter.get("/products/:type", filterProductsType);
prodRouter.get("/product/:id", filterProductId);
prodRouter.get("/cartProducts", cartProductsList);
prodRouter.post("/addProduct/:id",validateSchema(addProductCartSchema), addProductCart);
prodRouter.post("/deleteProduct",validateSchema(deleteProductCartSchema), deleteProductCart);
prodRouter.post("/checkout", validateSchema(checkoutSchema),checkout);
prodRouter.post ("/modifyProductQuantity/:type", modifyProductQuantity);

export default prodRouter;