export interface MockQuery {
  search: {
    fields: string[]
    value: string
  }
  start: number
  end: number
}
