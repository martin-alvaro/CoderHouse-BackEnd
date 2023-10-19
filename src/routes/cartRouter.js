import { Router } from "express";
import { isUser } from "../middlewares/authorize.js";
import * as controller from "../controllers/cart.controllers.js";

const router = Router();

router.get("/", controller.getAll);
/**
 * @swagger
 * /api/carts:
 *   get:
 *     summary: Obtener todos los carritos
 *     description: Obtiene la lista de todos los carritos.
 *     responses:
 *       200:
 *         description: Lista del carrito obtenida con éxito.
 *       500:
 *         description: Error en el servidor.
 */

router.get("/:id", controller.getById);
/**
 * @swagger
 * /api/carts/{id}:
 *   get:
 *     summary: Obtener carrito específico
 *     description: Obtiene carrito específico por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del carrito
 *         required: true
 *     responses:
 *       200:
 *         description: carrito obtenido con éxito.
 *       404:
 *         description: carrito no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.post("/", controller.create);
/**
 * @swagger
 * /api/carts:
 *   post:
 *     summary: Crear un nuevo carrito
 *     description: Crea un nuevo carrito.
 *     responses:
 *       201:
 *         description: Carrito creado con éxito.
 *       500:
 *         description: Error en el servidor.
 */ 

router.post("/:id/product/:productId", isUser, controller.addProductToCart);
/**
 * @swagger
 * /api/carts/{id}/products/{productId}:
 *   post:
 *     summary: Agregar producto al carrito
 *     description: Agrega un producto al carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID del carrito
 *         required: true
 *       - in: path
 *         name: productId
 *         description: ID del producto a agregar
 *         required: true
 *     responses:
 *       201:
 *         description: Producto agregado al carrito con éxito.
 *       404:
 *         description: Carrito o producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.delete("/:cid/products/:pid", isUser, controller.removeProductFromCart);
/**
 * @swagger
 * /api/carts/{cid}/products/{pid}:
 *   delete:
 *     summary: Eliminar producto del carrito
 *     description: Elimina un producto del carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         description: ID del carrito
 *         required: true
 *       - in: path
 *         name: pid
 *         description: ID del producto a eliminar
 *         required: true
 *     responses:
 *       200:
 *         description: Producto eliminado del carrito con éxito.
 *       404:
 *         description: Carrito o producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.put("/:cid", controller.updateCart);
/**
 * @swagger
 * /api/carts/{cid}:
 *   put:
 *     summary: Actualizar carrito
 *     description: Actualiza el carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         description: ID del carrito
 *         required: true
 *     responses:
 *       200:
 *         description: Carrito actualizado con éxito.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.put("/:cid/products/:pid", controller.updateProduct);
/**
 * @swagger
 * /api/carts/{cid}/products/{pid}:
 *   put:
 *     summary: Actualizar producto en el carrito
 *     description: Actualiza un producto en el carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         description: ID del carrito
 *         required: true
 *       - in: path
 *         name: pid
 *         description: ID del producto a actualizar
 *         required: true
 *     responses:
 *       200:
 *         description: Producto actualizado en el carrito con éxito.
 *       404:
 *         description: Carrito o producto no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.delete("/:cid", controller.removeAllProductsFromCart);

/**
 * @swagger
 * /api/carts/{cid}:
 *   delete:
 *     summary: Eliminar todos los productos del carrito
 *     description: Elimina todos los productos del carrito especificado por su ID.
 *     parameters:
 *       - in: path
 *         name: cid
 *         description: ID del carrito
 *         required: true
 *     responses:
 *       200:
 *         description: Todos los productos del carrito eliminados con éxito.
 *       404:
 *         description: Carrito no encontrado.
 *       500:
 *         description: Error en el servidor.
 */

router.post("/:cid/purchase", controller.purchaseCart);

export default router;