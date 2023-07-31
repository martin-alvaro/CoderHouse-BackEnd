import * as service from '../services/products.services.js'


export const getAll = async(req,res,next)=>{
    try {
        const response = await service.getAll()
        res.status(200).json(response)
    } catch (error) {
        next(error.message)
    }
}

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