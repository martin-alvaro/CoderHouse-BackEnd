import express from 'express'
import { Server} from 'socket.io'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewsRouter from './routes/viewsRouter.js' 
import { __dirname } from './utils.js';
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
import handlebars from 'express-handlebars'
import './daos/mongodb/connection.js'


/*-----------------------------------------------------------------------------------------------------------*/
const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, ()=>{
    console.log("The server is already running on port: " + PORT)
})

/*-----------------------------------------------------------------------------------------------------------*/
const socketServer = new Server(httpServer)

socketServer.on("connection", (socket) => {
  
});
  
/*-----------------------------------------------------------------------------------------------------------*/
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);



app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')

app.use(morgan('dev'))

app.use(errorHandler)

export { socketServer };






  
