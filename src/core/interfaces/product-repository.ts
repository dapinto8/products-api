import {Product} from '@core/entities/product'
import {GenericRepository} from '@core/interfaces/generic-repository'

export interface ProductRepository<Q> extends GenericRepository<Product, Q> {}
