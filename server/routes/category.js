import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import { getCategories, createCategory, getCategory, updateCategory, removeCategory } from './../controllers/category'

const router = new Router()

/*
 * List Categories.
 */
router.get('/category', getCategories)

/*
 * Create a Category.
 */
router.post('/category', authorize(), user.can('access admin'), createCategory)

/*
 * Retrieve a Category.
 */
router.get('/category/:id', getCategory)

/*
 * Update a Category.
 */
router.put('/category/:id', authorize(), user.can('access admin'), updateCategory)

/*
 * Delete a Category.
 */
router.delete('/category/:id', authorize(), user.can('access admin'), removeCategory)

export default router
