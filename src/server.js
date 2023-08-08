import express from 'express'
import { Server} from 'socket.io'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import viewsRouter from './routes/viewsRouter.js' 
import messageRouter from './routes/message.router.js'
import userRouter from './routes/userRouter.js'
import { __dirname } from './utils.js';
import morgan from 'morgan'
import { errorHandler } from './middlewares/errorHandler.js'
import handlebars from 'express-handlebars'
import './daos/mongodb/connection.js'
import cookieParser from 'cookie-parser'
import session from 'express-session'
import MongoStore from 'connect-mongo'
/*-----------------------------------------------------------------------------------------------------------*/
const app = express()
const PORT = 8080
const httpServer = app.listen(PORT, ()=>{
    console.log("The server is already running on port: " + PORT)
})

/*-----------------------------------------------------------------------------------------------------------*/
const socketServer = new Server(httpServer)
app.set("io", socketServer);

socketServer.on("connection", (socket) => {
    console.log("New connection stablished", socket.id);
  
    socket.on("chat:newUser", (username) => {
      socket.username = username;
      socket.broadcast.emit("chat:newUserConnected", username);
    });
  
    socket.on("chat:typing", (username) => {
      socket.broadcast.emit("chat:typing", username);
    });
  });
/*-----------------------------------------------------------------------------------------------------------*/
const mongoStoreOptions = {
  store:MongoStore.create({
      mongoUrl: 'mongodb+srv://Martin3175:Huevo3175@cluster0.ncltubd.mongodb.net/ecommerce?retryWrites=true&w=majority',
      crypto:{
        secret: '1234'
      }
  }),
  secret: '1234',
  resave: false,
  saveUninitialized: false,
  cookie: {
      maxAge: 60000
  }
};

/*-----------------------------------------------------------------------------------------------------------*/

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(__dirname + '/public'))

app.use(cookieParser()); 
app.use(session(mongoStoreOptions)); 

app.use("/", viewsRouter);
app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/chat", messageRouter);
app.use("/users",userRouter)



app.engine('handlebars', handlebars.engine())
app.set('views', __dirname + '/views')
app.set('view engine', 'handlebars')


app.use(morgan('dev'))

app.use(errorHandler)

export { socketServer };






  
