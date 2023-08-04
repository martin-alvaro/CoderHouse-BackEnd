import { Router } from "express";
import * as productService from "../services/products.services.js";
import * as messageService from "../services/messages.service.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    console.log("Fetching products...");
    const products = await productService.getAll();
    const plainProducts = products.docs.map((product) => {
      return { ...product.toObject(), _id: product._id.toString() };
    });
    res.render("home", { products: plainProducts });
  } catch (error) {
    res.json({ message: error.message, code: 500 });
  }
});

router.get("/realtimeproducts", async (req, res) => {
  try {
    console.log("Fetching products...");
    const products = await productService.getAll();
    const plainProducts = products.docs.map((product) => {
      return { ...product.toObject(), _id: product._id.toString() };
    });
    res.render("realtimeproducts", { products: plainProducts });
  } catch (error) {
    res.json({ message: error.message, code: 500 });
  }
});

router.get("/chat", async (req, res) => {
  try {
    const messages = await messageService.getAll();
    const plainMessages = messages.map((message) => message.toObject());
    res.render("chat", { messages: plainMessages });
  } catch (error) {
    res.json({ message: error, code: 500 });
  }
});

export default router;
