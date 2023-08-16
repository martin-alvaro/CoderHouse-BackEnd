import { Router } from "express";
import * as productService from "../services/products.services.js";
import * as messageService from "../services/messages.service.js";
import { login, register, errorLogin, errorRegister, profile } from '../controllers/views.controller.js';
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = Router();

router.get('/', authMiddleware, async (req, res) => {
  try {
      const user = req.session.user;
      const products = await productService.getAll();
      const plainProducts = products.docs.map((product) => {
          return { ...product.toObject(), _id: product._id.toString() };
      });
      res.render('home', { user, products: plainProducts });
  } catch (error) {
      res.json({ message: error.message, code: 500 });
  }
});

router.get("/realtimeproducts", async (req, res) => {
    try {
        const products = await productService.getAll();
        const plainProducts = products.docs.map((product) => {
            return { ...product.toObject(), _id: product._id.toString() };
        });
        res.render("realtimeproducts", { products: plainProducts });
    } catch (error) {
        res.json({ message: error.message, code: 500 });
    }
});

router.get("/chat", async (req, res) => {
    try {
        const messages = await messageService.getAll();
        const plainMessages = messages.map((message) => message.toObject());
        res.render("chat", { messages: plainMessages });
    } catch (error) {
        res.json({ message: error, code: 500 });
    }
});

router.get('/login', login);
router.get('/register', register);
router.get('/errorLogin', errorLogin);
router.get('/errorRegister', errorRegister);
router.get('/profile', profile);

export default router;
