import {Middleware} from 'koa'
import {MongooseProductRepository} from '@infra/persistence/mongoose/product/product-repository'
import {ProductService} from '@services/product'
import {Query} from '@core/entities/query'
import {ProductQueryBuilder} from '@infra/persistence/mongoose/product/product-query-builder'

const searchProducts: Middleware = async ctx => {
  const query = new Query(ctx.query)

  // Factory
  const productQueryBuilder = new ProductQueryBuilder()
  const productRepository = new MongooseProductRepository()
  const productService = new ProductService(productRepository, productQueryBuilder)

  const data = await productService.getProducts(query)
  ctx.body = data
}

export const productRouteController = {
  searchProducts
}
