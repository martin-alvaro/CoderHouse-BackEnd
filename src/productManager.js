import fs from 'fs'
class ProductManager {
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  addProduct(title, description, price, thumbnail, code, stock) {
    if (!title || !description || !price || !thumbnail || !code || !stock) {
      return 'Please complete all required fields!!';
    }

    try {
      this.getProducts();

      const productExist = this.products.find((product) => product.code === code);
      if (productExist) {
        return `The product code already exists: ${code}`;
      }

      const id = this.products.length + 1;

      const newProduct = {
        id,
        title,
        description,
        price,
        thumbnail,
        code,
        stock,
      };

      this.products.push(newProduct);

      fs.writeFileSync(this.path, JSON.stringify(this.products));

      console.log('Product added!!');
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return 'An error occurred while adding the product.';
    }
  }

  getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const data = fs.readFileSync(this.path, 'utf8');
        this.products = JSON.parse(data);
      } else {
        this.products = [];
      }
    } catch (error) {
      console.error('Error reading products:', error);
      this.products = [];
    }

    return this.products;
  }

  getProductById(id) {
    try {
      this.getProducts();

      const productId = this.products.find((product) => product.id === id);
      if (productId) {
        console.log(`Product found: ${id}`);
        return productId;
      } else {
        return 'Not found';
      }
    } catch (error) {
      console.error(error);
      return 'Error getting product by ID:';
    }
  }
  updateProduct(id, data) {
    try {
      this.getProducts();

      const productIndex = this.products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        this.products[productIndex] = { ...this.products[productIndex], ...data };
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log(`Product updated: ${id}`);
        return this.products[productIndex];
      } else {
        return 'Product not found';
      }
    } catch (error) {
      console.error(error);
      return 'Error updating product:';
    }
  }

  deleteProduct(id) {
    try {
      this.getProducts();

      const productIndex = this.products.findIndex((product) => product.id === id);
      if (productIndex !== -1) {
        const deletedProduct = this.products.splice(productIndex, 1);
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log(`Product deleted: ${id}`);
        return deletedProduct;
      } else {
        return 'Product not found';
      }
    } catch (error) {
      console.error(error);
      return 'Error deleting product:';
    }
  }
  
}


// const product = new ProductManager('./data/products.json');



//agrego productos
// console.log(product.addProduct('Camiseta Brasil', 'Descripcion del producto 1', 15000, 'imagen1.jpg', 1, 32))
// console.log(product.addProduct('Camiseta Alemania', 'Descripcion del producto 2', 12999, 'imagen2.jpg', 12, 17))
// console.log(product.addProduct('Camiseta Italia', 'Descripcion del producto 3', 12500, 'imagen3.jpg', 123, 14))
// console.log(product.addProduct('Camiseta Argentina', 'Descripcion del producto 4', 13000 , 'imagen1.jpg', 1234, 25))
// console.log(product.addProduct('Camiseta Uruguay', 'Descripcion del producto 5', 11000, 'imagen5.jpg', 1234, 12)) //no funciona por que ya existe el codigo
// console.log(product.addProduct('Camiseta Francia', 'Descripcion del producto 6', 12599, 12345, 17))// no funciona por que faltan campos por completar


//busco todos los productos
//  console.log(product.getProducts())


//busco producto por id
// console.log(product.getProductById(4))//existe


//busco producto por id
// console.log(product.getProductById(5)) //no existe


//actualizo producto (existe)
// console.log(product.updateProduct(2, {
//   title: 'Camiseta francia Actualizada',
//   description: 'Descripción actualizada',
//   price: 13999,
//   thumbnail: 'imagen2_actualizada.jpg',
//   code: 12,
//   stock: 10,
// }));


//actualizo producto (no existe)
// console.log(product.updateProduct(22, {
//   title: 'Camiseta actualizada',
//   description: 'Descripción actualizada',
//   price: 13999,
//   thumbnail: 'img.jpg',
//   code: 12,
//   stock: 10,
// }));


//busco todos los productos
// console.log(product.getProducts())


// //elimino producto (existe)
// console.log(product.deleteProduct(2))


//elimino un producto (no existe)
// console.log(product.deleteProduct(6))


//busco todos los elementos
// console.log(product.getProducts())


export default ProductManager;
