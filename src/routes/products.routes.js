import { Router } from "express";

const prodRouter = Router();

prodRouter.get("/products");
prodRouter.get("/products/:type");
prodRouter.get("/product/:id");
prodRouter.post("/checkout");

export default prodRouter;