export default (schema, options) => {
  schema.statics.getOptions = function () {
    return this.findOne({ _id: 'options' }).exec()
    .then(options => {
      if (options) {
        return options
      } else {
        return {}
      }
    })
  }

  schema.statics.updateOptions = function (payload) {
    payload._id = 'options'
    return this.update({ _id: 'options' }, payload, { upsert: true, setDefaultsOnInsert: true, runValidators: true }).exec()
  }
}