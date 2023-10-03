import * as service from "../services/cart.services.js";

export const getAll = async (req, res, next) => {
  try {
    const response = await service.getAll();
    res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req, res, next) => {
  try {
    const { id } = req.params;
    const cart = await service.getById(id);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const create = async (req, res, next) => {
  try {
    const cart = await service.create();
    res.status(201).json(cart);
  } catch (error) {
    next(error);
  }
};

export const addProductToCart = async (req, res, next) => {
  try {
    const { id, productId } = req.params;
    const cart = await service.addProductToCart(id, productId);

    if (cart) {
      res.status(201).json(cart);
    } else {
      res.status(404).json({ message: "Not found" });
    }
  } catch (error) {
    console.log(error);
    next(error);
  }
};

export const updateCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const { products } = req.body;
    const cart = await service.updateCart(cid, products);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const updateProduct = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const { quantity } = req.body;
    const cart = await service.updateProduct(cid, pid, quantity);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart or product not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeProductFromCart = async (req, res, next) => {
  try {
    const { cid, pid } = req.params;
    const cart = await service.removeProductFromCart(cid, pid);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart or product not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const removeAllProductsFromCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.removeAllProductsFromCart(cid);
    if (cart) {
      res.status(200).json(cart);
    } else {
      res.status(404).json({ message: "Cart not found" });
    }
  } catch (error) {
    next(error);
  }
};

export const purchaseCart = async (req, res, next) => {
  try {
    const { cid } = req.params;
    const cart = await service.getById(cid);
    if (!cart) {
      res.status(404).json({ message: "Cart not found" });
      return;
    }
    const purchaserEmail = req.session.user.email;
    const purchaseResult = await service.purchaseCart(cid, purchaserEmail);
    if (purchaseResult.error) {
      res.status(400).json({ message: purchaseResult.error, failedProducts: purchaseResult.failedProducts });
      return;
    }
    const productsNotPurchased = cart.products.filter((product) => {
      const purchasedProduct = purchaseResult.successfulProducts.find((p) => p.productId === product.id.toString());
      return !purchasedProduct;
    });
    await service.updateCart(cid, productsNotPurchased);
    res.status(200).json({
      message: "Purchase successful",
      ticket: purchaseResult.ticket,
      failedProducts: purchaseResult.failedProducts,
    });
  } catch (error) {
    next(error);
  }
};
