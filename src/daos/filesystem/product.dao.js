import fs from 'fs'


class ProductDaoFS {  
  constructor(path) {
    this.path = path;
    this.products = [];
  }

  /*-----------------------------------------------------------------------------------------------------------*/
  create(title, description, code, price, stock, category, thumbnails = []) {
    if (!title || !description || !code || !price || !stock || !category) {
      return 'Please complete all required fields!';
    }

    try {
      this.getProducts();

      const id = this.products.length + 1;

      const newProduct = {
        id,
        title,
        description,
        code,
        price,
        status: true,
        stock,
        category,
        thumbnails: Array.isArray(thumbnails) ? thumbnails : [thumbnails],
      };

      this.products.push(newProduct);

      fs.writeFileSync(this.path, JSON.stringify(this.products));

      console.log('Product added!');
      return newProduct;
    } catch (error) {
      console.error('Error adding product:', error);
      return 'Error adding product!';
    }
  }
  
  /*-----------------------------------------------------------------------------------------------------------*/
  getAll() {
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

  /*-----------------------------------------------------------------------------------------------------------*/
  getById(id) {
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
  
  /*-----------------------------------------------------------------------------------------------------------*/
  update(pid, data) {
    try {
      this.getProducts();
  
      const productIndex = this.products.findIndex((product) => product.id === pid);
      if (productIndex !== -1) {
        this.products[productIndex] = { ...this.products[productIndex], ...data };
        fs.writeFileSync(this.path, JSON.stringify(this.products));
        console.log(`Product updated: ${pid}`);
        return this.products[productIndex];
      } else {
        return 'Product not found';
      }
    } catch (error) {
      console.error(error);
      return 'Error updating product:';
    }
  }
  
  /*-----------------------------------------------------------------------------------------------------------*/
  delete(id) {
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

export default ProductDaoFS;
