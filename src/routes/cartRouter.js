import { Router } from "express";
import { isUser } from "../middlewares/authorize.js";
import * as controller from "../controllers/cart.controllers.js";

const router = Router();

router.get("/", controller.getAll);
router.get("/:id", controller.getById);
router.post("/", controller.create);
router.post("/:id/product/:productId", isUser, controller.addProductToCart);
router.delete("/:cid/products/:pid", isUser, controller.removeProductFromCart);
router.put("/:cid", controller.updateCart);
router.put("/:cid/products/:pid", controller.updateProduct);
router.delete("/:cid", controller.removeAllProductsFromCart);
router.post("/:cid/purchase", controller.purchaseCart);

export default router;