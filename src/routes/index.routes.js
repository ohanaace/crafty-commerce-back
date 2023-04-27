import { Router } from "express";
import userRouter from "./auth.routes.js";
import prodRouter from "./products.routes.js";

const router = Router();

router.use(userRouter);
router.use(prodRouter);

export default router;