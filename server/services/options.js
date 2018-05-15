import Options from './../models/Options'
import AppError from './../errors/AppError'

export default {
  getOptions () {
   return Options.getOptions()
  },
  saveOptions (payload) {
    return Options.updateOptions(payload)
    .then(options => {
      if (!options) throw new AppError('Options not found', 404)
      return options
    })
  }
}