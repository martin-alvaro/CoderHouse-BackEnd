import * as service from '../services/products.services.js'


export const getAll = async (req, res, next) => {
    try {
      const { limit = 10, page = 1, sort, query } = req.query;
      console.log('Current page:', page);
      console.log('Current limit:', limit);
  
      // Convertir el valor de "page" y "limit" a números enteros
      const parsedPage = parseInt(page, 10);
      const parsedLimit = parseInt(limit, 10);
  
      // Asegúrate de que "sort" sea "asc" o "desc" para evitar errores
      const parsedSort = sort === 'asc' ? 'asc' : sort === 'desc' ? 'desc' : undefined;
  
      // Llamar a la función de servicio para obtener los productos con paginación y ordenamiento
      const response = await service.getAll(parsedPage, parsedLimit, parsedSort, query);
  
      console.log('Query:', response.query);
  
      const totalPages = response.totalPages;
      const prevPage = parsedPage > 1 ? parsedPage - 1 : null;
      const nextPage = parsedPage < totalPages ? parsedPage + 1 : null;
      const hasPrevPage = parsedPage > 1;
      const hasNextPage = parsedPage < totalPages;
      const prevLink = hasPrevPage
        ? `/api/products?limit=${parsedLimit}&page=${prevPage}&sort=${parsedSort}&query=${query}`: null;
        const nextLink = hasNextPage
        ? `/api/products?limit=${parsedLimit}&page=${nextPage}&sort=${parsedSort}&query=${query}`: null;
  
      res.status(200).json({
        status: 'success',
        payload: response.docs,
        totalPages: totalPages,
        prevPage: prevPage,
        nextPage: nextPage,
        page: parsedPage,
        hasPrevPage: hasPrevPage,
        hasNextPage: hasNextPage,
        prevLink: prevLink,
        nextLink: nextLink,
      });
    } catch (error) {
      next(error.message);
    }
  };
  
export const getById = async(req,res,next)=>{
    try {
        const {id} = req.params
        const prod = await service.getById(id)
        if(!prod) res.status(404).json({msg:'Product not found!!'})
        else res.json(prod)
    } catch (error) {
        next(error.message)
    }
}

export const create = async(req,res,next)=>{
try {
    const newProd = await service.create(req.body)
    if(!newProd)  res.status(404).json({msg: 'Validation error!!'})   
    else res.json(newProd)   
} catch (error) {
    next(error.message)
}}

export const update = async(req,res,next)=>{try {
    const {id} = req.params
    const updateProd = await service.update(id, req.body)
    res.json(updateProd)
} catch (error) {
    next(error.message)
}}

export const remove = async(req,res,next)=>{
    try {
        const {id} = req.params
        const prod = await service.remove(id)
        if (!prod) {
            return res.status(404).json({ msg: 'Product not found!!' });
          }
          res.json(prod);
    } catch (error) {
        next(error.message)
    }
}

export const aggregation = async(req,res,next)=>{
    try {
        const response = await service.aggregation()
        res.json(response)
    } catch (error) {
        next(error.message)
    }
}