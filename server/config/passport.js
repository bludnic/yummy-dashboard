import passport from 'koa-passport'
import LocalStrategy from 'passport-local'
import jwt from 'jsonwebtoken'

import UserService from './../services/user'
import facebook from './facebook'
import AppError from './../errors/AppError'

const FacebookStrategy = require('passport-facebook').Strategy
const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt
const jwtOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: 'si-pula-ne'
}


/*
 * Local Strategy
 */
passport.use(new LocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false
}, (email, password, done) => {

  UserService.authenticate(email, password)
  .then(user => done(null, user))
  .catch(err => done(err, false))

}))

/*
 * JWT Strategy
 */
passport.use(new JwtStrategy(jwtOptions, (payload, done) => {

  UserService.getProfile(payload.id)
  .then(profile => done(null, profile))
  .catch(err => done(err, false))

}))

/**
 * Facebook Strategy
 * https://github.com/wahyudibo/koa-passport-facebook-example
 */
passport.use(new FacebookStrategy({
  clientID: facebook.clientId,
  clientSecret: facebook.clientSecret,
  callbackURL: facebook.callbackUrl,
  profileFields: facebook.profileFields,
}, (accessToken, refreshToken, profile, done) => {
  return done(null, profile)
}))


/*
 * Authenticate middleware Helper.
 */
export function authenticate (ctx, next) {
  return (ctx, next) => {

    return passport.authenticate('local', (err, user) => {
      if (err) throw err

      const payload = {
        id: user._id,
        email: user.email
      }
      const token = jwt.sign(payload, jwtOptions.secretOrKey)

      ctx.body = { user: user.displayName, token: token }
    })(ctx, next)

  }
}

/**
 * Authenticate facebook middleware helper
 */
export function authenticateFacebook (ctx, next) {
  return (ctx, next) => {

    return passport.authenticate('facebook', {
      session: false,
      failureRedirect : '/api' // @TODO change failure redirect
    }, (err, user) => {
      if (err) throw err

      return UserService.authFacebook(user) // register or update facebook profile
      .then(profile => {

        const payload = {
          id: profile._id, // facebook ID or bd ID?
          email: profile.email
        }
        const token = jwt.sign(payload, jwtOptions.secretOrKey)

        ctx.body = { token: token }

      })
      .catch((err) => { throw err })

    })(ctx, next)

  }
}

/*
 * Authorization middleware Helper.
 */
export function authorize () {
  return (ctx, next) => {
    return passport.authenticate('jwt', (err, user) => {

      if (err) throw err
      if (!user) throw new AppError('Unauthorized', 401)

      ctx.user = user

      return next()
    })(ctx, next)
  }
}

/**
 * Generate JWT token
 */
export function generateJWT (user) {
  const payload = {
    id: user.id,
    email: user.email
  }
  const token = jwt.sign(payload, jwtOptions.secretOrKey)

  return token
}