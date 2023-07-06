import { Router } from "express";
import ProductManager from '../managers/productManager.js'
import { socketServer } from '../server.js';

/*-----------------------------------------------------------------------------------------------------------*/
const productManager = new ProductManager('./data/products.json');
const router = Router()


/*-----------------------------------------------------------------------------------------------------------*/
router.get('/', (req, res, next) => {
    try {
      const { limit } = req.query;
      const products = productManager.getProducts();
    
      if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json(limitedProducts);
      } else {
        res.json(products);
      }
    }catch (error) {
      next(error)
    }
  });

/*-----------------------------------------------------------------------------------------------------------*/
router.get('/:pid', (req, res, next) => {
    try {
      const { pid } = req.params;
      const product = productManager.getProductById(parseInt(pid));
  
      if (product === 'Not found') {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({
          message: `Product found: ${pid}`,
          product: product
        });
      }
    }catch (error) {
      next(error)
    }
  });
  
/*-----------------------------------------------------------------------------------------------------------*/
 router.post('/', (req, res, next) => {
    try {
      const { title, description, code, price, stock, category, thumbnails } = req.body;  
      if (!title || !description || !code || !price || !stock || !category) {
        return res.status(400).json({ error: 'Please provide all required fields!' });
      }
      const productExist = productManager.getProducts().find((product) => product.code === code);
      if (productExist) {
        return res.status(400).json({ error: `The product code already exists: ${code}` });
      }
  
      const addedProduct = productManager.addProduct(
        title,
        description,
        code,
        price,
        stock,
        category,
        thumbnails
      );

      socketServer.emit('newProduct', newProduct);

      res.json({
        message: 'Product added!!',
        addedProduct: addedProduct
      });
    }catch (error) {
      next(error)
    }
  });
  
/*-----------------------------------------------------------------------------------------------------------*/ 
router.put('/:pid', (req, res, next) => {
    try {

      const { pid } = req.params;
      const updatedFields = req.body;
  
      const updatedProduct = productManager.updateProduct(parseInt(pid), updatedFields);
  
      if (updatedProduct === 'Product not found') {
        return res.status(404).json({ error: 'Product not found' });
      }
      res.json({
        message: `Product updated: ${pid}`,
        updatedProduct: updatedProduct
      });
    }catch (error) {
      next(error)
    }
  });
  
/*-----------------------------------------------------------------------------------------------------------*/
  router.delete('/:pid', (req, res, next) => {
    try {
      const { pid } = req.params;
      const deletedProduct = productManager.deleteProduct(parseInt(pid));
      if (deletedProduct === 'Product not found') {
        return res.status(404).json({ error: 'Product not found' });
      }

      socketServer.emit('productDeleted', deletedProduct);

      res.json({
        message: `Product deleted: ${pid}`,
        deletedProduct: deletedProduct[0]
      });
    }catch (error) {
      next(error)
    }
  });
  
    
  export default router