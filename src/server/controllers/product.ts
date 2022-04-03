import {Middleware} from 'koa'
import {Query} from '@core/entities/query'
import {MongooseProductRepository} from '@infra/persistence/mongoose/product/product-repository'
import {ProductService} from '@services/product'
import {MongooseProductQueryBuilder} from '@infra/persistence/mongoose/product/product-query-builder'

const searchProducts: Middleware = async ctx => {
  const query = new Query(ctx.query)

  // Factory
  const productQueryBuilder = new MongooseProductQueryBuilder()
  const productRepository = new MongooseProductRepository()
  const productService = new ProductService(productRepository, productQueryBuilder, 0.5)

  const data = await productService.getProducts(query)
  ctx.body = data
}

export const productRouteController = {
  searchProducts
}
