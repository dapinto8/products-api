import { Query } from './query'

export class PaginatedData<T> {
  data: T[]
  total: number
  previousPage: number
  page: number
  nextPage: number
  pageSize: number
  totalPages: number

  constructor(query: Query, total: number, data: T[]) {
    this.data = data
    this.total = total
    this.page = query.page
    this.pageSize = query.pageSize
    this.totalPages = Math.ceil(this.total / this.pageSize)
    this.previousPage = query.page - 1 === 0 ? null : query.page - 1
    this.nextPage = query.page + 1 > this.totalPages ? null : query.page + 1
  }
}