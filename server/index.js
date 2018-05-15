import dotenv from 'dotenv/config'
import Koa from 'koa'
import bodyParser from 'koa-body'
import mount from 'koa-mount'
import serve from 'koa-static'
import cors from 'koa2-cors'
import passport from 'koa-passport'
import path from 'path'
import { Nuxt, Builder } from 'nuxt'
import http from 'http'
import https from 'https'
import forceSSL from 'koa-force-ssl'
import fs from 'fs'

import Routes from './routes'
import db from './db'
import passportStrategy from './config/passport'
import roles from './middlewares/roles'

async function start () {

  const app = new Koa()
  const host = process.env.HOST
  const port = process.env.PORT

  // Catch errors
  app.use(async (ctx, next) => {
    try {
      await next();
    } catch (err) {
      ctx.status = err.status || 500;
      ctx.body = { error: err.message };
      ctx.app.emit('error', err, ctx);
    }
  });

  // Force SSL on all page
  // app.use(forceSSL())

  // Register middlewares
  app.use(cors({ origin: '*' }))
  app.use(bodyParser({ multipart: true }))
  app.use(mount('/static', serve(path.join(__dirname, '/static'))))
  app.use(passport.initialize())

  // Koa roles
  app.use(roles.middleware())

  // Register routes
  Routes(app, '/api')

  // Import and Set Nuxt.js options
  let config = require('../nuxt.config.js')
  config.dev = !(app.env === 'production')

  // Instantiate nuxt.js
  const nuxt = new Nuxt(config)

  // Build in development
  if (config.dev) {
    const builder = new Builder(nuxt)
    await builder.build()
  }

  app.use(async (ctx, next) => {
    await next()
    ctx.status = 200 // koa defaults to 404 when it sees that status is unset
    return new Promise((resolve, reject) => {
      ctx.res.on('close', resolve)
      ctx.res.on('finish', resolve)
      nuxt.render(ctx.req, ctx.res, promise => {
        // nuxt.render passes a rejected promise into callback on error.
        promise.then(resolve).catch(reject)
      })
    })
  })

  // Listen mongo & koa
  db.once('open', () => {
    // app.listen(port, host)
    // console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console
  })

  // Start server
  app.listen(port, host)
  console.log('Server listening on ' + host + ':' + port) // eslint-disable-line no-console

  // SSL options
  // var options = {
  //   key: fs.readFileSync(path.resolve(__dirname) + '/../.ssl/key.pem'),
  //   cert: fs.readFileSync(path.resolve(__dirname) + '/../.ssl/cert.pem')
  // }

  // start the server
  //http.createServer(app.callback()).listen(port)
  //https.createServer(options, app.callback()).listen(443)

  return { app, db }
}

const server = start()

export default server