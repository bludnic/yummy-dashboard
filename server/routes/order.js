import Router from 'koa-router'
//import validate from 'express-validation'

import { authorize } from './../config/passport'
import { getOrders, createOrder, getOrder, updateOrder, removeOrder } from './../controllers/order'
import user from './../middlewares/roles'

const router = new Router()

/*
 * List Orders.
 */
router.get('/order', authorize(), getOrders)

/*
 * Create an Order.
 */
router.post('/order', authorize(), createOrder)

/*
 * Retrieve an Order.
 */
router.get('/order/:id', authorize(), user.can('access order'), getOrder)

/*
 * Update an Order.
 */
router.put('/order/:id', authorize(), user.can('access order'), updateOrder)

/*
 * Delete an Order.
 */
router.delete('/order/:id', authorize(), user.can('access order'), removeOrder)

export default router
