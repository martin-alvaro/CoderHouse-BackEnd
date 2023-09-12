import express from 'express';
import { Server } from 'socket.io';
import router from './routes/index.js'
import { __dirname } from './utils.js';
import morgan from 'morgan';
import { errorHandler } from './middlewares/errorHandler.js';
import handlebars from 'express-handlebars';
import './daos/mongodb/connection.js';
import cookieParser from 'cookie-parser';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import passport from 'passport';
import './passport/local-strategy.js'
import './passport/github-strategy.js'
import 'dotenv/config'

const app = express();
const PORT = process.env.PORT || 3000;

const httpServer = app.listen(PORT, () => {
    console.log("The server is already running on port: " + PORT);
});

const socketServer = new Server(httpServer);
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

const mongoStoreOptions = {
    store: MongoStore.create({
        mongoUrl: 'mongodb+srv://Martin3175:Huevo3175@cluster0.ncltubd.mongodb.net/ecommerce?retryWrites=true&w=majority',
        crypto: {
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

app.use(cookieParser()); 
app.use(session(mongoStoreOptions)); 
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + '/public'));

app.use('/' , router)

app.engine('handlebars', handlebars.engine());
app.set('views', __dirname + '/views');
app.set('view engine', 'handlebars');

app.use(morgan('dev'));
app.use(errorHandler);

export { socketServer };
