import { Router } from "express";
import { __dirname } from "../utils.js";
import fs from "fs";

const router = Router();

router.get('/', (req, res) => {
    try {
        const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
        res.render('home', { products});
    } catch (error) {
        res.render('home', { products: [] });
    }
});

router.get('/realtimeproducts', (req, res) => {
  try {
      const products = JSON.parse(fs.readFileSync('./data/products.json', 'utf-8'));
      res.render('realTimeProducts', { products });
  } catch (error) {
      res.render('realTimeProducts', { products: [] });
  }
});

export default router;
