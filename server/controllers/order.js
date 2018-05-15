import OrderService from './../services/order'

export function getOrders (ctx, next) {
  // If is admin return all orders
  const user = ctx.user.role === 'admin' ? null : ctx.user.id

  return OrderService.getOrders({ user })
  .then(orders => ctx.body = orders)
}

export function createOrder (ctx, next) {
  const user = ctx.user.id
  const body = { ...ctx.request.body, user }

  return OrderService.createOrder(body)
  .then(order => ctx.body = order)
}

export function getOrder (ctx, next) {
  return OrderService.getOrder(ctx.params.id)
  .then(order => ctx.body = order)
}

export function updateOrder (ctx, next) {
  return OrderService.updateOrder(ctx.params.id, ctx.request.body)
  .then(res => ctx.body = res)
}

export function removeOrder (ctx, next) {
  return OrderService.removeOrder(ctx.params.id)
  .then(res => ctx.body = res)
}