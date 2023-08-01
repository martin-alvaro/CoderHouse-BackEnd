import { Router } from "express";
import * as productService from "../services/products.services.js";
import * as messageService from "../services/messages.service.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const products = await productService.getAll();
    const plainProducts = products.map((product) => product.toObject());
    res.render("home", { products: plainProducts });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    const products = await productService.getAll();
    const plainProducts = products.map((product) => product.toObject());
    res.render("realTimeProducts", { products: plainProducts });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
});

router.get("/chat", async (req, res) => {
  try {
    const messages = await messageService.getAll();
    const plainMessages = messages.map((message) => message.toObject());
    res.render("chat", { messages: plainMessages });
  } catch (error) {
    res.render("error", { message: error, code: 500 });
  }
});

export default router;