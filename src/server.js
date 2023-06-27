import express from 'express'
import productRouter from './routes/productRouter.js'
import cartRouter from './routes/cartRouter.js'
import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { errorHandler } from './middlewares/errorHandler.js'

/*-----------------------------------------------------------------------------------------------------------*/
const __dirname = dirname(fileURLToPath(import.meta.url))
const app = express()
const PORT = 8080

/*-----------------------------------------------------------------------------------------------------------*/
app.get('/', (req, res)=>{
    res.send('Mi primer servidor con express')
})
app.listen(PORT, ()=>{
    console.log("The server is already running on port: " + PORT)
})

/*-----------------------------------------------------------------------------------------------------------*/
app.use(express.json())

app.use(express.urlencoded({extended:true}))

app.use('/api/products', productRouter)

app.use('/api/carts', cartRouter)

app.use(express.static(__dirname + '/public'))

app.use(errorHandler)




  
