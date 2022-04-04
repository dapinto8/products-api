import {Query} from '@core/entities/query'
import {MockProductRepository} from '@test/mocks/mock-product-repository'
import {MockProductQueryBuilder} from '@test/mocks/mock-product-query-builder'
import {ProductService} from '@services/product'
import {MockQuery} from '@test/mocks/mock-query'
import productsFixture from '@test/fixtures/products.json'

describe('Test ProductsService', () => {
  const productQueryBuilder = new MockProductQueryBuilder()
  const productsRepository = new MockProductRepository()
  const productService = new ProductService<MockQuery>(productsRepository, productQueryBuilder, 0.5)

  it('should check that products are 50 percent off when searching with a palindrome', async () => {
    const query = new Query({
      search: 'dsaasd',
      page: 1,
      pageSize: 10
    })
    const products = await productService.getProducts(query)
    expect(products.data.length).toBe(3)
    expect(products.pageSize).toBe(10)
    expect(products.total).toBe(3)
    expect(products.totalPages).toBe(1)

    const product = productsFixture.find(product => product.brand.includes(query.search))
    expect(products.data[0].price).toBe(product.price * 0.5)
  })

  it('should check that products are not 50 percent off when searching without a palindrome', async () => {
    const query = new Query({
      search: 'aas',
      page: 1,
      pageSize: 10
    })
    const products = await productService.getProducts(query)
    expect(products.data.length).toBe(3)
    expect(products.pageSize).toBe(10)
    expect(products.total).toBe(3)
    expect(products.totalPages).toBe(1)

    const product = productsFixture.find(product => product.brand.includes('saas'))
    expect(products.data[0].price).not.toBe(product.price * 0.5)
    expect(products.data[0].price).toBe(product.price)
  })

  it('should check search by product id', async () => {
    const query = new Query({
      search: '10',
      page: 1,
      pageSize: 10
    })
    const products = await productService.getProducts(query)
    expect(products.data.length).toBe(1)
    expect(products.pageSize).toBe(10)
    expect(products.total).toBe(1)
    expect(products.totalPages).toBe(1)

    const product = productsFixture.find(product => product.id === Number(query.search))
    expect(products.data[0].price).not.toBe(product.price * 0.5)
    expect(products.data[0].price).toBe(product.price)
  })
})
