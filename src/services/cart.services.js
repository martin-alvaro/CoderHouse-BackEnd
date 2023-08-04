import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
import * as cartDao from "../daos/mongodb/cart.dao.js";

const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
  try {
    const response = await cartDao.getAll();
    return response;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    return cart || false;
  } catch (error) {
    console.log(error);
  }
};

export const create = async () => {
  try {
    const newCart = await cartDao.create();
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (id, productId) => {
  try {
    const cart = await cartDao.getById(id);


    const product = await productDao.getById(productId);

    if (!product) throw new Error("Product not found");
    if (!cart) throw new Error("Cart not found");

    const newCart = await cartDao.addProductToCart(id, productId);
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const removeProductFromCart = async (cartId, productId) => {
  try {
    const cart = await cartDao.getById(cartId);
    cart.products = cart.products.filter(
      (product) => product.id.toString() !== productId.toString()
    );
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateCart = async (cartId, products) => {
  try {
    const cart = await cartDao.getById(cartId);
    cart.products = products;
    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const updateProduct = async (cartId, productId, quantity) => {
  try {
    const cart = await cartDao.getById(cartId);
    const productInCart = cart.products.find(
      (prod) => prod.id.toString() === productId.toString()
    );

    if (productInCart) {
      productInCart.quantity = quantity;
      await cart.save();
    }

    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};

export const removeAllProductsFromCart = async (cartId) => {
  try {
    const cart = await cartDao.getById(cartId);
    cart.products = [];

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};