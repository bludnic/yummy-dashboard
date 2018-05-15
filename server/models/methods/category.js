export default (schema, options) => {
  schema.statics.getCategories = function () {
    return this.find({}).exec()
  }

  schema.statics.getCategory = function (id) {
    return this.findById(id).exec()
  }

  schema.statics.updateCategory = function (id, payload) {
    return this.findByIdAndUpdate(id, payload).exec()
  }
}