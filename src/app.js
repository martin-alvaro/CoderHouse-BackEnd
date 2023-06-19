import express from 'express'
import ProductManager from './productManager.js'

const app = express()
const PORT = 8080

app.get('/', (req, res)=>{
    res.send('Mi primer servidor con express')
})

app.listen(PORT, ()=>{
    console.log("The server is already running on port: " + PORT)

})


const productManager = new ProductManager('./data/products.json');

app.get('/products', (req, res) => {
    try {
      const { limit } = req.query;
      const products = productManager.getProducts();
    
      if (limit) {
        const limitedProducts = products.slice(0, parseInt(limit));
        res.json(limitedProducts);
      } else {
        res.json(products);
      }
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });


  app.get('/products/:pid', (req, res) => {
    try {
      const { pid } = req.params;
      const product = productManager.getProductById(parseInt(pid));
      if (product === 'Not found') {
        res.status(404).json({ error: 'Product not found' });
      } else {
        res.json(product);
      }
    } catch (error) {
      res.status(500).json({ error: 'Server Error' });
    }
  });
  
