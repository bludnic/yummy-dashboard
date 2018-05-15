import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import { getOptions, saveOptions } from './../controllers/options'

const router = new Router()

/*
 * Get Options.
 */
router.get('/options', getOptions)

/*
 * Update Options.
 */
router.post('/options', authorize(), user.can('access admin'), saveOptions)

export default router
