import CouponService from './../services/coupon'

export function getCoupons (ctx, next) {
  return CouponService.getCoupons()
  .then(coupons => ctx.body = coupons)
}

export function createCoupon (ctx, next) {
  return CouponService.createCoupon(ctx.request.body)
  .then(coupon => ctx.body = coupon)
}

export function getCoupon (ctx, next) {
  return CouponService.getCoupon(ctx.params.id)
  .then(coupon => ctx.body = coupon)
}

export function updateCoupon (ctx, next) {
  return CouponService.updateCoupon(ctx.params.id, ctx.request.body)
  .then(res => ctx.body = res)
}

export function removeCoupon (ctx, next) {
  return CouponService.removeCoupon(ctx.params.id)
  .then(res => ctx.body = res)
}
