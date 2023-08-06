import { cartModel } from "./models/cart.model.js";

export const getAll = async () => {
  try {
    const carts = await cartModel.find();
    return carts;
  } catch (error) {
    console.log(error);
  }
};

export const getById = async (id) => {
  try {
    const cart = await cartModel.findById(id);
    return cart || false;
  } catch (error) {
    console.log(error);
  }
};

export const create = async () => {
  try {
    const newCart = await cartModel.create({ products: [] });
    return newCart;
  } catch (error) {
    console.log(error);
  }
};

export const addProductToCart = async (id, productId) => {
  try {
    const cart = await cartModel.findById(id);

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

    await cart.save();
    return cart;
  } catch (error) {
    throw new Error(error.message);
  }
};


export const removeProductFromCart = async (cartId, productId) => {
  try {
    const cart = await cartModel.findById(cartId);
    cart.products = cart.products.filter(
      (product) => product.id.toString() !== productId.toString()
    );
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateCartProducts = async (cartId, products) => {
  try {
    const cart = await cartModel.findById(cartId);
    cart.products = products;
    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const updateProduct = async (cartId, productId, quantity) => {
  try {
    const cart = await cartModel.findById(cartId);
    const productInCart = cart.products.find(
      (prod) => prod.id.toString() === productId.toString()
    );

    if (productInCart) {
      productInCart.quantity = quantity;
      await cart.save();
    }

    return cart;
  } catch (error) {
    console.log(error);
  }
};

export const removeAllProductsFromCart = async (cartId) => {
  try {
    const cart = await cartModel.findById(cartId);
    cart.products = [];

    await cart.save();
    return cart;
  } catch (error) {
    console.log(error);
  }
};
