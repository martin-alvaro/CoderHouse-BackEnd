import express from 'express';
import ProductManager from '../managers/productManager.js';

const router = express.Router();
const productManager = new ProductManager('./data/products.json');

router.get('/', (req, res) => {
  const products = productManager.getProducts();
  res.render('home', { products });
});

router.get('/realtimeproducts', (req, res) => {
  const products = productManager.getProducts();
  res.render('realTimeProducts', { products });
});

export default router;
