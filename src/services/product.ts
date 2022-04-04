import {PaginatedData} from '@core/entities/paginated-data'
import {Product} from '@core/entities/product'
import {Query} from '@core/entities/query'
import {ProductRepository} from '@core/interfaces/product-repository'
import {QueryBuilder} from '@core/interfaces/query-builder'

export class ProductService<Q> {
  discount: number

  constructor(
    private readonly productRepository: ProductRepository<Q>,
    private readonly productQueryBuilder: QueryBuilder<Q>,
    discount: number
  ) {
    this.discount = discount
  }

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
        price: product.price * this.discount,
        discount: this.discount
      }
    })
  }

  async getProducts(query: Query): Promise<PaginatedData<Product>> {
    const searchText = query.search

    // Check if search text is an id and get product by id
    if (!!Number(searchText)) {
      const product = await this.productRepository.findById(Number(searchText))
      const data = product ? [product] : []
      return new PaginatedData<Product>(query, 1, data)
    }

    const productsQuery = this.productQueryBuilder.buildQuery(query)
    let [data, total] = await this.productRepository.findAll(productsQuery)

    if (this.checkPalidrome(searchText)) {
      data = this.applyDiscount(data)
    }

    return new PaginatedData<Product>(query, total, data)
  }
}
