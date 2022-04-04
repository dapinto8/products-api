import {ProductRepository} from '@core/interfaces/product-repository'
import {Product} from '@core/entities/product'
import {ProductModel} from './product-model'
import {MongooseQuery} from '@infra/persistence/mongoose/mongoose-query'

export class MongooseProductRepository implements ProductRepository<MongooseQuery> {
  async findById(id: number): Promise<Product | null> {
    try {
      const product = await ProductModel.findOne({id})
      if (!product) return null

      return new Product(product)
    } catch (error) {
      throw error
    }
  }

  async findAll(query: MongooseQuery): Promise<[Product[], number]> {
    try {
      const products = await ProductModel.find(query.filterQuery)
        .sort(query.sort)
        .skip(query.skip)
        .limit(query.limit)

      const data = products.map(product => new Product(product))
      const count = await ProductModel.countDocuments(query.filterQuery)

      return [data, count]
    } catch (error) {
      throw error
    }
  }
}
