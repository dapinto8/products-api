import {Schema, model} from 'mongoose'
import {Product} from '@core/entities/product'

const schema = new Schema<Product>({
  id: Number,
  brand: String,
  description: String,
  image: String,
  price: Number
})

schema.index({brand: 'text', description: 'text'})

export const ProductModel = model<Product>('Product', schema, 'products')
