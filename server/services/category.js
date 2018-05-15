import Category from './../models/Category'
import AppError from './../errors/AppError'

export default {
  getCategories () {
    return Category.getCategories({})
  },

  createCategory (payload) {
    return new Category(payload).save()
  },

  getCategory (id) {
    return Category.getCategory(id)
    .then(category => {
      if (!category) throw new AppError('Item not found', 404)
      return category
    })
  },

  updateCategory (id, payload) {
    return Category.updateCategory(id, payload)
    .then(category => {
      if (!category) throw new AppError('Item not found', 404)
      return category
    })
  },

  removeCategory (id) {
    return Category.findByIdAndRemove(id)
    .then(category => {
      if (!category) throw new AppError('Item not found', 404)
      return category
    })
  }
}
