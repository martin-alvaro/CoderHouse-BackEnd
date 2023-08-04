import { Router } from "express";
import * as controller from "../controllers/cart.controllers.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.post("/:id/product/:productId", controller.addProductToCart);
router.delete("/:cid/products/:pid", controller.removeProductFromCart);
router.put("/:cid", controller.updateCart);
router.put("/:cid/products/:pid", controller.updateProduct);
router.delete("/:cid", controller.removeAllProductsFromCart);

export default router;