import MenuItem from './../models/MenuItem'
import AppError from './../errors/AppError'

export default {
  getMenuItems ({ category }) {
    return MenuItem.getMenuItems({ category })
  },

  createMenuItem (payload) {
    return new MenuItem(payload).save()
  },

  getMenuItem (id) {
    return MenuItem.getMenuItem(id)
    .then(menuItem => {
      if (!menuItem) throw new AppError('Item not found', 404)
      return menuItem
    })
  },

  updateMenuItem (id, payload) {
    return MenuItem.updateMenuItem(id, payload)
    .then(menuItem => {
      if (!menuItem) throw new AppError('Item not found', 404)
      return menuItem
    })
  },

  removeMenuItem (id) {
    return MenuItem.findByIdAndRemove(id)
    .then(menuItem => {
      if (!menuItem) throw new AppError('Item not found', 404)
      return menuItem
    })
  }
}
