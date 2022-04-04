import {Query} from '@core/entities/query'

export interface QueryBuilder<Q> {
  buildQuery(query: Query): Q
}
