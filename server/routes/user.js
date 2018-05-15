import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import { getUsers, createUser, getUser, updateUser, deleteUser } from './../controllers/user'

const router = new Router()

/*
 * List Users.
 */
router.get('/user', authorize(), user.can('access admin'), getUsers)

/*
 * Create an User.
 */
router.post('/user', authorize(), user.can('access admin'), createUser)

/*
 * Retrieve an User.
 */
router.get('/user/:id', authorize(), user.can('access admin'), getUser)

/*
 * Update an User.
 */
router.put('/user/:id', authorize(), user.can('access admin'), updateUser)

/*
 * Delete an User.
 */
router.delete('/user/:id', authorize(), user.can('access admin'), deleteUser)

export default router
