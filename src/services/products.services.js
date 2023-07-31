import ProductDaoMongoDB from '../daos/mongodb/product.dao.js'
const productDao = new ProductDaoMongoDB()


export const getAll = async ()=>{
    try {
        const response = await productDao.getAll()
        return (response)
    } catch (error) {
        console.log(error)
    }
}

export const getById= async(id)=>{
    try {
        const response = await productDao.getById(id);
        if(!response) return false 
        else return response
        
    } catch (error) {
        console.log(error)
    }
}

export const create = async (obj)=>{
    try {
        const newProduct = await productDao.create(obj)
        if(!newProduct) return false
        else return newProduct
    } catch (error) {
        console.log(error)
    }
}

export const update = async (id, obj)=>{
    try {
        const response = await productDao.update(id, obj)
        return response 
    } catch (error) {
        
    }
}

export const remove = async (id)=>{
    try {
        const response = await productDao.delete(id)
        if (!response) {
            return null;
          }
          return response;
    } catch (error) {
        
    }
}