import UserService from './../services/user'

export function getUsers (ctx) {
  const { page, perPage } = ctx.params

  return UserService.getUsers({ page, perPage })
  .then(users => ctx.body = users)
}

export function createUser (ctx) {
  return UserService.createUser(ctx.request.body)
  .then(user => ctx.body = user)
}

export function getUser(ctx) {
  return UserService.getUser(ctx.params.id)
  .then(user => ctx.body = user)
}

export function updateUser(ctx) {
  return UserService.updateUser(ctx.params.id, ctx.request.body)
  .then(res => ctx.body = res)
}

export function deleteUser(ctx) {
  return UserService.deleteUser(ctx.params.id)
  .then(res => ctx.body = res)
}
