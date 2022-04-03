import { PaginatedData } from '@core/entities/paginated-data'
import {Product} from '@core/entities/product'
import {Query} from '@core/entities/query'
import {ProductRepository} from '@core/interfaces/product-repository'
import {QueryBuilder} from '@core/interfaces/query-builder'

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly productQueryBuilder: QueryBuilder
  ) {}

  private checkPalidrome(text: string | undefined): boolean {
    if (!text) return false

    const textLowerCase = text.toLowerCase()
    const textReversed = textLowerCase.split('').reverse().join('')
    return textLowerCase === textReversed
  }

  private applyDiscount(product: Product[]): Product[] {
    return product.map(product => {
      return {
        ...product,
        price: product.price * 0.5,
        discount: 0.5
      }
    })
  }

  async getProducts(query: Query): Promise<PaginatedData<Product>> {
    const searchText = query.search

    // Check if search text is an id and get product by id
    if (!!Number(searchText)) {
      const product = await this.productRepository.findById(Number(searchText))
      return new PaginatedData<Product>(query, 1, [product]) 
    }

    const productsQuery = this.productQueryBuilder.buildQuery(query)
    let [data, total] = await this.productRepository.findAll(productsQuery)

    if (this.checkPalidrome(searchText)) {
      data = this.applyDiscount(data)
    }

    return new PaginatedData<Product>(query, total, data)
  }
}
