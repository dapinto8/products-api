export class Product {
  id: number
  brand: string
  description: string
  image: string
  price: number
  discount?: number

  constructor(data: Partial<Product>) {
    this.id = data.id
    this.brand = data.brand
    this.description = data.description
    this.image = data.image
    this.price = data.price
  }
}
