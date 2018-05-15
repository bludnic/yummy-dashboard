import Order from './../models/Order'
import AppError from './../errors/AppError'

export default {
  getOrders ({ user }) {
    // { order, orderby, page, per_page }
    const params = {}
    if (user) params.user = user

    return Order.getOrders(params)
  },

  createOrder (payload) {
    return new Order(payload).save()
  },

  getOrder (id) {
    return Order.getOrder(id)
    .then(order => {
      if (!order) throw new AppError('Item not found', 404)
      return order
    })
  },

  updateOrder (id, payload) {
    return Order.updateOrder(id, payload)
    .then(order => {
      if (!order) throw new AppError('Item not found', 404)
      return order
    })
  },

  removeOrder (id) {
    return Order.findByIdAndRemove(id).exec()
    .then(order => {
      if (!order) throw new AppError('Item not found', 404)
      return order
    })
  },

  isOwner (orderId, userId) {
    return Order.findOne({ _id: orderId, user: userId }).exec()
    .then(order => {
      if (order) return true
      return false
    })
  }
}
