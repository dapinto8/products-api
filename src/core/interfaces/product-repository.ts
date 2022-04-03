import {Product} from '@core/entities/product';

export interface ProductRepository {
  findById(id: number): Promise<Product>;
  findAll(query: any): Promise<[Product[], number]>;
}