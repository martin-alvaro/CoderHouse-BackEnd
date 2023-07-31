import express from 'express';
import * as productService from "../services/products.services.js";

const router = express.Router();

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

  export default router;