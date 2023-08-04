import ProductDaoMongoDB from '../daos/mongodb/product.dao.js'
const productDao = new ProductDaoMongoDB()


export const getAll = async (page = 1, limit = 10, sort, query) => {
    try {
      const filter = query ? { category: query } : {};
      const sortOptions = sort === 'asc' ? { price: 1 } : sort === 'desc' ? { price: -1 } : {};
  
      const response = await productDao.getAll(page, limit, filter, sortOptions);
      return response;
    } catch (error) {
      throw new Error(error.message);
    }
  };

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

export const aggregation = async()=>{
    try {
        const aggregates = await productDao.aggregation()
        return aggregates
    } catch (error) {
     console.log(error);
    }
}