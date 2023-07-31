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