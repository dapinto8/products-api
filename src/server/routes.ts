import Router from 'koa-router'
import {pingRouteController} from './controllers/ping'
import {productRouteController} from './controllers/product'

export function loadRoutes(router: Router) {
  router.get('/ping', pingRouteController)
  router.get('/products', productRouteController.searchProducts)

  return router
}
