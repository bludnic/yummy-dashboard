import Router from 'koa-router'
import passport from 'passport'
import validate from 'koa-joi-validate'

import validations from './validation/profile'
import { authenticate, authenticateFacebook } from './../config/passport'
import { registerUser } from './../controllers/profile'

const router = new Router()

/*
 * Login.
 */
router.post('/login', validate(validations.create), authenticate())

/**
 * Register
 */
router.post('/register', validate(validations.create), registerUser)

/**
 * Facebok login redirect.
 */
router.get('/auth/facebook', passport.authenticate('facebook', {
  scope: [
    'public_profile',
    'email'
  ],
}))

/**
 * Facebok login callback.
 */
router.get('/auth/facebook/callback', authenticateFacebook())

export default router
