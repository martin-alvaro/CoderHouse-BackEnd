import ProductDaoMongoDB from "../daos/mongodb/product.dao.js";
import * as cartDao from "../daos/mongodb/cart.dao.js";
import * as ticketService from "./ticket.service.js";

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
    console.log(error);
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
    console.log(error);
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
    console.log(error);
  }
};

export const removeAllProductsFromCart = async (id) => {
  try {
    const cart = await cartDao.getById(id);
    cart.products = [];
    await cartDao.updateCart(id, cart.products);
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const purchaseCart = async (cartId, purchaserEmail) => {
  try {
    const cart = await cartDao.getById(cartId);

    if (!cart) {
      return { error: "Cart not found" };
    }

    let totalAmount = 0;
    const productsToUpdate = [];
    const productsNotPurchased = [];

    for (const productInCart of cart.products) {
      const product = await productDao.getById(productInCart.id);

      if (!product || product.stock < productInCart.quantity) {
        productsNotPurchased.push(productInCart.id);
      } else {
        totalAmount += product.price * productInCart.quantity;
        productsToUpdate.push({ id: productInCart.id, quantity: productInCart.quantity });
      }
    }

    if (productsNotPurchased.length > 0) {
      const ticketData = {
        code: generateUniqueTicketCode(), 
        purchase_datetime: new Date(),
        amount: totalAmount,
        purchaser: purchaserEmail,
      };

      const ticket = await ticketService.create(ticketData);

      await updateCart(cartId, productsToUpdate);

      return { error: "Insufficient stock for one or more products", ticket };
    } else {
      for (const productToUpdate of productsToUpdate) {
        await updateProductStock(productToUpdate.id, productToUpdate.quantity);
      }

      await removeAllProductsFromCart(cartId);

      return { message: "Purchase completed successfully", ticket: null };
    }
  } catch (error) {
    console.log(error);
    return { error: "An error occurred during the purchase process", ticket: null };
  }
};
