import {Query} from '@core/entities/query'
import {QueryBuilder} from '@core/interfaces/query-builder'
import {MongooseQuery} from '../mongoose-query'

export class MongooseProductQueryBuilder implements QueryBuilder {
  private getSearch(text: string) {
    const regex = new RegExp(text, 'i')
    return {$or: [{brand: regex}, {description: regex}]}
  }

  private getSort(sort: string) {
    switch (sort) {
      case 'brand_asc':
        return {brand: 1}
      case 'brand_desc':
        return {brand: -1}
      case 'price_asc':
        return {price: 1}
      case 'price_desc':
        return {price: -1}
      default:
        return {}
    }
  }

  buildQuery(query: Query): MongooseQuery {
    const mongooseQuery: MongooseQuery = {
      filterQuery: this.getSearch(query.search),
      sort: this.getSort(query.sort),
      skip: (query.page - 1) * query.pageSize,
      limit: Number(query.pageSize)
    }
    
    return mongooseQuery
  }
}
