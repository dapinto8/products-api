import {Query} from '@core/entities/query'

export interface QueryBuilder {
  buildQuery(query: Query): any
}
