export default (schema, options) => {
  schema.statics.getMenuItems = function ({ category }) {
    let query = {}
    if (category) {
      query.category = category
    }
    return this.find(query).sort({ createdAt: -1 }).populate(['category']).exec()
  }

  schema.statics.getMenuItem = function (id) {
    return this.findById(id).exec()
  }

  schema.statics.updateMenuItem = function (id, payload) {
    return this.findByIdAndUpdate(id, payload).exec()
  }
}