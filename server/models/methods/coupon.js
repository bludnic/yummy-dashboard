export default (schema, options) => {
  schema.statics.getCoupons = function () {
    return this.find({}).exec()
  }

  schema.statics.getCoupon = function (id) {
    return this.findById(id).exec()
  }

  schema.statics.updateCoupon = function (id, payload) {
    return this.findByIdAndUpdate(id, payload).exec()
  }
}