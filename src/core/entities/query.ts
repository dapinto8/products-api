export class Query {
  search: string = null
  page = 1
  pageSize = 10
  sort = null

  constructor(params: any) {
    this.search = params.search
    this.page = Number(params.page)
    this.pageSize = Number(params.pageSize)
    this.sort = params.sort
  }
}
