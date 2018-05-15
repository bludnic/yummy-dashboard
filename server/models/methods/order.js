export default (schema, options) => {
  schema.statics.getOrders = function (options) {
    return this.find(options)
    .select({ source: 1, items: 1, coupon: 1, status: 1, createdAt: 1, updatedAt: 1 })
    .populate({ path: 'items.menuItem', select: { pizzaGroups: 0 } })
    .populate({ path: 'user', select: { _id: 1, email: 1, firstName: 1, lastName: 1, shipAddress: 1 } })
    .populate({ path: 'coupon', select: { _id: 1, code: 1, discount: 1, discountType: 1 } })
    .exec()
  }

  schema.statics.getOrder = function (id) {
    return this.findById(id)
    .select({ source: 1, items: 1, coupon: 1, status: 1, createdAt: 1, updatedAt: 1 })
    .populate({ path: 'items.menuItem', select: { pizzaGroups: 0 } })
    .populate({ path: 'user', select: { _id: 1, email: 1, firstName: 1, lastName: 1, shipAddress: 1 } })
    .populate({ path: 'coupon', select: { _id: 1, code: 1, discount: 1, discountType: 1 } })
    .exec()
  }

  schema.statics.updateOrder = function (id, payload) {
    // return this.findByIdAndUpdate(id, payload).exec() // need to return new document after update
    return this.findOneAndUpdate({ _id: id }, { $set: payload }, { new: true })
    .populate({ path: 'items.menuItem', select: { pizzaGroups: 0 } })
    .populate({ path: 'user', select: { _id: 1, email: 1, firstName: 1, lastName: 1, shipAddress: 1 } })
    .populate({ path: 'coupon', select: { _id: 1, code: 1, discount: 1, discountType: 1 } })
    .exec()
  }
}