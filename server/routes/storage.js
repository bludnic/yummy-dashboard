import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import { uploadImage } from './../controllers/storage'

const router = new Router()

router.post('/storage/upload', authorize(), user.can('access admin'), uploadImage)

export default router