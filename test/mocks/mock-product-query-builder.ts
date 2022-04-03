import {Query} from '@core/entities/query'
import {QueryBuilder} from '@core/interfaces/query-builder'
import {MockQuery} from './mock-query'

export class MockProductQueryBuilder implements QueryBuilder {
  buildQuery(query: Query): MockQuery {
    const mockQuery: MockQuery = {
      search: {
        fields: ['brand', 'description'],
        value: query.search
      },
      start: (query.page * query.pageSize) - query.pageSize,
      end: query.page * query.pageSize
    }

    return mockQuery
  }
}
