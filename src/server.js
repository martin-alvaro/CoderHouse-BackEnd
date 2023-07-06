import express from 'express'
import { Server} from 'socket.io'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewsRouter from './routes/viewsRouter.js' 
import { __dirname } from './utils.js';
import { errorHandler } from './middlewares/errorHandler.js'
import handlebars from 'express-handlebars'
import ProductManager from './managers/productManager.js';
/*-----------------------------------------------------------------------------------------------------------*/
const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, ()=>{
    console.log("The server is already running on port: " + PORT)
})

/*-----------------------------------------------------------------------------------------------------------*/
const socketServer = new Server(httpServer)
const productManager = new ProductManager('./data/products.json');

socketServer.on('connection', (socket) => {
    console.log(`Usuario conectado: ${socket.id}`);
  
    socket.on('createProduct', (productData) => {
      try {
        const newProduct = productManager.addProduct(
          productData.title,
          productData.description,
          productData.code,
          productData.price,
          productData.stock,
          productData.category,
          productData.thumbnails
        );
  
        socketServer.emit('newProduct', newProduct);
  
      } catch (error) {
        console.error('Error adding product:', error);
      }
    });
  
    socket.on('deleteProduct', (productId) => {
      try {
        const deletedProduct = productManager.deleteProduct(productId);
  
        socketServer.emit('productDeleted', deletedProduct);
  
      } catch (error) {
        console.error('Error deleting product:', error);
      }
    });
  
    socket.on('disconnect', () => {
      console.log(`Usuario desconectado`);
    });
  
    socket.emit('saludoDesdeBack', 'Bienvenido a WebSocket');
  });
  
/*-----------------------------------------------------------------------------------------------------------*/
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.use('/', viewsRouter)
app.use('/api/products', productRouter)
app.use('/api/carts', cartRouter)


app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(errorHandler)

export { socketServer };






  
