class ProductManager {
    constructor() {
        this.products = [];
    }

    addProduct(title, description, price, thumbnail, code, stock) {
        if (!title || !description || !price || !thumbnail || !code || !stock) {
            return 'Faltan completar campos!!'
        }
        const productExist = this.products.find((product) => product.code === code)
        if (productExist) {
            return `El codigo del producto ya existe: ${code}`
        }

        const id = this.products.length + 1

        const newProduct = {
            id,
            title,
            description,
            price,
            thumbnail,
            code,
            stock,
        }

        this.products.push(newProduct)

        console.log("Producto agregado con exito!!")
        return newProduct

    }

    getProducts() {
        return this.products;
    }

    getProductById(id){
        const productId = this.products.find((product)=> product.id === id)
        if(productId){
            console.log(`Producto encontrado: ${id}`)
            return productId
        }else{
            return "Not found"
        }
    }
    
}

const product = new ProductManager()

//agrego productos
console.log(product.addProduct('Camiseta Brasil', 'Descripcion del producto 1', 15000, 'imagen1.jpg', 1, 32))
console.log(product.addProduct('Camiseta Alemania', 'Descripcion del producto 2', 12999, 'imagen2.jpg', 12, 17))
console.log(product.addProduct('Camiseta Italia', 'Descripcion del producto 3', 12500, 'imagen3.jpg', 123, 14))
console.log(product.addProduct('Camiseta Argentina', 'Descripcion del producto 4', 13000 , 'imagen1.jpg', 1234, 25))
console.log(product.addProduct('Camiseta Uruguay', 'Descripcion del producto 5', 11000, 'imagen5.jpg', 1234, 12)) //no funciona por que ya existe el codigo
console.log(product.addProduct('Camiseta Francia', 'Descripcion del producto 6', 12599, 12345, 17))// no funciona por que faltan campos por completar


//busco todos los productos
console.log(product.getProducts())


//busco producto por id
console.log(product.getProductById(4))//existe
//busco producto por id
console.log(product.getProductById(5)) //no existe