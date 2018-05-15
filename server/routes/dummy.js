import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import MenuItem from './../models/MenuItem'
import Category from './../models/Category'
import dummy from './../dummy'

const router = new Router()


/*
 * Import Dummy Categories.
 */
router.get('/dummy/categories', authorize(), user.can('access admin'), async ctx => {
  try {
    console.log('Saving categories...')
    dummy.categories.map(item => {
      const category = new Category(item)
      const result = category.save()
      console.log(result)
    })
  } catch(err) {
    ctx.throw(400, err)
  }
})

/*
 * Import Dummy MenuItems.
 */
router.get('/dummy/menu', authorize(), user.can('access admin'), async ctx => {
  try {
    console.log('Saving menuItems...')
    dummy.menuItems.map(item => {
      const menuItem = new MenuItem(item)
      const result = menuItem.save()
      console.log(result)
    })

  } catch(err) {
    ctx.throw(400, err)
  }
})


export default router