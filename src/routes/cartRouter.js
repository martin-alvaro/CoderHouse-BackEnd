import { Router } from "express";
import CartManager from '../managers/cartManager.js';

/*-----------------------------------------------------------------------------------------------------------*/
const cartManager = new CartManager('./data/carts.json');
const router = Router();

/*-----------------------------------------------------------------------------------------------------------*/
router.get('/', (req, res, next) => {
    try{
    const carts = cartManager.getCarts();
    res.json({ carts });
  }catch (error) {
    next(error)
  }
});

/*-----------------------------------------------------------------------------------------------------------*/
router.get('/:cid', (req, res, next) => {
  try {
    const { cid } = req.params;
    const cartId = parseInt(cid); 

    const cart = cartManager.getCartById(cartId);

    if (cart !== 'Not found') {
      res.json({ message: `Cart found with ID: ${cid}`, cart });
    } else {
      res.status(404).json({ error: 'Cart not found' });
    }
  }catch (error) {
    next(error)
  }
});

/*-----------------------------------------------------------------------------------------------------------*/
router.post('/', (req, res, next)=> {
    try{
      const newCart = cartManager.createCart();
      const message = `Cart created: ${newCart.id}`;
      res.status(201).json({ message, cart: newCart });
    }catch (error) {
      next(error)
    }
  });

/*-----------------------------------------------------------------------------------------------------------*/
  router.post('/:cid/product/:pid', (req, res, next) => {
    try {
      const { cid, pid } = req.params;
      const cartId = parseInt(cid);
      const productId = parseInt(pid);
  
      const cart = cartManager.addProductToCart(cartId, productId);
  
      if (cart === 'Cart not found') {
        res.status(404).json({ error: 'Cart not found' });
      } else if (cart === 'Product not found') {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json({ message: 'Product added to cart', cart });
      }
    } catch (error) {
      next(error);
    }
  });
  

export default router;
