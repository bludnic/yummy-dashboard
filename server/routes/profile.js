import Router from 'koa-router'
import passport from 'passport'
import validate from 'koa-joi-validate'

import validations from './validation/profile'
import { authorize } from './../config/passport'
import { getProfile, updateProfile } from './../controllers/profile'

const router = new Router()

/*
 * Retrieve profile.
 */
router.get('/profile', authorize(), getProfile)

/*
 * Update profile.
 */
router.put('/profile', authorize(), validate(validations.update), updateProfile)

export default router
