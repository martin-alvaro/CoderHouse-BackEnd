import fs from 'fs';
import ProductManager from './productManager.js';


class CartManager {
  constructor(path) {
    this.path = path;
    this.carts = [];
  }

  /*-----------------------------------------------------------------------------------------------------------*/
  createCart() {
    try {
      this.getCarts();

      const id = this.carts.length + 1;

      const newCart = {
        id,
        products: []
      };

      this.carts.push(newCart);

      fs.writeFileSync(this.path, JSON.stringify(this.carts));

      console.log('Cart created!');
      return newCart;
    } catch (error) {
      console.error(error);
      return 'Error creating cart:';
    }
  }

  /*-----------------------------------------------------------------------------------------------------------*/
  getCarts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf8');
        this.carts = JSON.parse(data);
      } else {
        this.carts = [];
      }
    } catch (error) {
      console.error('Error reading carts:', error);
      this.carts = [];
    }

    return this.carts;
  }

  /*-----------------------------------------------------------------------------------------------------------*/
  getCartById(id) {
    try {
      this.getCarts();

      const cart = this.carts.find((cart) => cart.id === id);
      if (cart) {
        console.log(`Cart found: ${id}`);
        return cart;
      } else {
        return 'Not found';
      }
    } catch (error) {
      console.error(error);
      return 'Error getting cart by ID:';
    }
  }

  /*-----------------------------------------------------------------------------------------------------------*/
  addProductToCart(cartId, productId) {
    try {
      this.getCarts();

      const cartIndex = this.carts.findIndex((cart) => cart.id === cartId);
      if (cartIndex === -1) {
        return 'Cart not found';
      }

      const productManager = new ProductManager('./data/products.json');

      const product = productManager.getProductById(productId);
      if (product === 'Not found') {
        return 'Product not found';
      }

      const cart = this.carts[cartIndex];

      const existingProductIndex = cart.products.findIndex((prod) => prod.product === productId);
      if (existingProductIndex !== -1) {
        cart.products[existingProductIndex].quantity += 1;
      } else {
          const newProduct = {
            product: productId,
            quantity: 1
        };
        cart.products.push(newProduct);
      }

      fs.writeFileSync(this.path, JSON.stringify(this.carts));

      console.log(`Product added to cart: ${productId}`);
      return cart;
    } catch (error) {
      console.error(error);
      return 'Error adding product to cart:';
    }
  }

}


export default CartManager;