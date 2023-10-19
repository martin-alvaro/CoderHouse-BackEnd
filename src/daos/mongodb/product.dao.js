import { productModel } from './models/product.model.js';
import { logger } from '../../logger.js';

export default class ProductDaoMongoDB {
 
  async getAll(page = 1, limit = 10, filter = {}, sortOptions = {}) {
    try {
      const response = await productModel.paginate(filter, {
        page: page,
        limit: limit,
        sort: sortOptions,
      });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async create(product) {
    try {
      const response = await productModel.create(product);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async getById(id) {
    try {
      const response = await productModel.findById(id);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async update(id, product) {
    try {
      const response = await productModel.findByIdAndUpdate(id, product, { new: true });
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async delete(id) {
    try {
      const response = await productModel.findByIdAndDelete(id);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }

  async aggregation() {
    try {
      const response = await productModel.aggregate([
        {
          $match: { category: 'Camiseta' }
        }
      ]);
      return response;
    } catch (error) {
      logger.error(error);
    }
  }
}
