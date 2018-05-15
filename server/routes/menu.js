import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import { getMenuItems, createMenuItem, getMenuItem, updateMenuItem, removeMenuItem } from './../controllers/menuItem'

const router = new Router()

// http://docs.opendining.net/api/#!/menuitems.js/getMenuItem_get_0

/*
 * List MenuItems.
 */
router.get('/menu', getMenuItems)

/*
 * Create a MenuItem.
 */
router.post('/menu', authorize(), user.can('access admin'), createMenuItem)

/*
 * Retrieve a MenuItem.
 */
router.get('/menu/:id', getMenuItem)

/*
 * Update a MenuItem.
 */
router.put('/menu/:id', authorize(), user.can('access admin'), updateMenuItem)

/*
 * Delete a MenuItem.
 */
router.delete('/menu/:id', authorize(), user.can('access admin'), removeMenuItem)

export default router
