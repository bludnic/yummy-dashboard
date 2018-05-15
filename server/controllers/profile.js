import ProfileService from './../services/profile'

export function registerUser (ctx) {
  const user = ctx.request.body

  // return ctx.body = user

  return ProfileService.registerUser(user)
  .then(user => ctx.body = user)
}

export function getProfile (ctx) {
  const id = ctx.user.id

  return ProfileService.getProfile(id)
  .then(user => ctx.body = user)
}

export function updateProfile (ctx) {
  const id = ctx.user.id
  const body = ctx.request.body

  return ProfileService.updateProfile(id, body)
  .then(user => ctx.body = user)
}