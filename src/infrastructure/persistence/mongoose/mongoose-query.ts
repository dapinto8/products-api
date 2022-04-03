import {FilterQuery} from 'mongoose'

export interface MongooseQuery {
  filterQuery: FilterQuery<any>
  sort: {
    [key: string]: number
  }
  skip: number
  limit: number
}
