import Coupon from './../models/Coupon'
import AppError from './../errors/AppError'

export default {
  getCoupons () {
    return Coupon.getCoupons({})
  },

  createCoupon (payload) {
    return new Coupon(payload).save()
  },

  getCoupon (id) {
    return Coupon.getCoupon(id)
    .then(coupon => {
      if (!coupon) throw new AppError('Item not found', 404)
      return coupon
    })
  },

  updateCoupon (id, payload) {
    return Coupon.updateCoupon(id, payload)
    .then(coupon => {
      if (!coupon) throw new AppError('Item not found', 404)
      return coupon
    })
  },

  removeCoupon (id) {
    return Coupon.findByIdAndRemove(id)
    .then(coupon => {
      if (!coupon) throw new AppError('Item not found', 404)
      return coupon
    })
  }
}
