import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
import * as cartDao from "../daos/mongodb/cart.dao.js";
import * as ticketService from "./ticket.service.js";
import { logger } from '../logger.js';

const productDao = new ProductDaoMongoDB();

export const getAll = async () => {
  try {
    const response = await cartDao.getAll();
    return response;
  } catch (error) {
    logger.info(error);
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    return cart || false;
  } catch (error) {
    logger.info(error);
  }
};

export const create = async () => {
  try {
    const newCart = await cartDao.create();
    return newCart;
  } catch (error) {
    logger.info(error);
  }
};

export const addProductToCart = async (id, productId) => {
  try {
    const cart = await cartDao.getById(id);

    if (!cart) {
      throw new Error("Cart not found");
    }

    const productInCart = cart.products.find(
      (prod) => prod.id.toString() === productId.toString()
    );

    if (productInCart) {
      productInCart.quantity++;
    } else {
      cart.products.push({
        id: productId,
        quantity: 1,
      });
    }

    await cartDao.updateCart(id, cart.products);
    return cart;
  } catch (error) {
    logger.info(error.message);
    throw new Error(error.message);
  }
};

export const updateCart = async (id, products) => {
  try {
    const cart = await cartDao.getById(id);
    cart.products = products;
    await cartDao.updateCart(id, cart.products);
    return cart;
  } catch (error) {
    logger.info(error);
  }
};

export const updateProduct = async (id, productId, quantity) => {
  try {
    const cart = await cartDao.getById(id);
    const productInCart = cart.products.find(
      (prod) => prod.id.toString() === productId.toString()
    );

    if (productInCart) {
      productInCart.quantity = quantity;
      await cartDao.updateCart(id, cart.products);
    }

    return cart;
  } catch (error) {
    logger.info(error);
  }
};

export const removeProductFromCart = async (id, productId) => {
  try {
    const cart = await cartDao.getById(id);
    cart.products = cart.products.filter(
      (product) => product.id.toString() !== productId.toString()
    );
    await cartDao.updateCart(id, cart.products);
    return cart;
  } catch (error) {
    logger.info(error);
  }
};

export const removeAllProductsFromCart = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    cart.products = [];
    await cartDao.updateCart(id, cart.products);
    return cart;
  } catch (error) {
    logger.info(error);
  }
};
