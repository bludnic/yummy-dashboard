import menu from './menu'
import category from './category'
import order from './order'
import coupon from './coupon'
import auth from './auth'
import user from './user'
import profile from './profile'
import upload from './upload'
import storage from './storage'
import options from './options'
import dummy from './dummy'

export default (app, prefix = '') => {
  app.use(menu.prefix(prefix).routes())
  app.use(category.prefix(prefix).routes())
  app.use(order.prefix(prefix).routes())
  app.use(coupon.prefix(prefix).routes())
  app.use(auth.prefix(prefix).routes())
  app.use(user.prefix(prefix).routes())
  app.use(profile.prefix(prefix).routes())
  app.use(upload.prefix(prefix).routes())
  app.use(storage.prefix(prefix).routes())
  app.use(options.prefix(prefix).routes())
  app.use(dummy.prefix(prefix).routes())
} 