import jwt from 'koa-jwt'

const secret = 'si-pula-ne'

export default () => {
  return jwt({ secret })
}