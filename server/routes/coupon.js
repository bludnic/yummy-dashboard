import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import { getCoupons, createCoupon, getCoupon, updateCoupon, removeCoupon } from './../controllers/coupon'

const router = new Router()

/*
 * List Coupons.
 */
router.get('/coupon', getCoupons)

/*
 * Create an Coupon.
 */
router.post('/coupon', authorize(), user.can('access admin'), createCoupon)

/*
 * Retrieve an Coupon.
 */
router.get('/coupon/:id', getCoupon)

/*
 * Update an Coupon.
 */
router.put('/coupon/:id', authorize(), user.can('access admin'), updateCoupon)

/*
 * Delete an Coupon.
 */
router.delete('/coupon/:id', authorize(), user.can('access admin'), removeCoupon)

export default router
