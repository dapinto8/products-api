import {Product} from '@core/entities/product'
import {ProductRepository} from '@core/interfaces/product-repository'
import {MockQuery} from './mock-query'
import productsFixture from '@test/fixtures/products.json'

export class MockProductRepository implements ProductRepository<MockQuery> {
  private products: Product[] = productsFixture

  constructor() {}

  private filterByCriteria(product: Product, query: MockQuery): boolean {
    let found = false
    const searchText = query.search.value.toLowerCase()
    query.search.fields.forEach(field => {
      if (product[field].toLowerCase().includes(searchText) && !found) {
        found = true
      }
    })
    return found
  }

  findById(id: number): Promise<Product> {
    return new Promise(resolve => {
      const product = this.products.find(product => product.id === id)
      resolve(product)
    })
  }

  findAll(query: MockQuery): Promise<[Product[], number]> {
    return new Promise(resolve => {
      const data = this.products
        .filter(product => this.filterByCriteria(product, query))
        .slice(query.start, query.end)

      resolve([data, data.length])
    })
  }
}
