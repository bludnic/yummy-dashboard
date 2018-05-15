import Router from 'koa-router'

import { authorize } from './../config/passport'
import user from './../middlewares/roles'
import { uploadFeaturedImage } from './../controllers/upload'

const router = new Router

router.post('/upload', authorize(), user.can('access admin'), uploadFeaturedImage)

export default router