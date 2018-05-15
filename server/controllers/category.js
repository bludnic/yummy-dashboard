import CategoryService from './../services/category'

export function getCategories (ctx, next) {
  return CategoryService.getCategories()
  .then(categories => ctx.body = categories)
}

export function createCategory (ctx, next) {
  return CategoryService.createCategory(ctx.request.body)
  .then(category => ctx.body = category)
}

export function getCategory (ctx, next) {
  return CategoryService.getCategory(ctx.params.id)
  .then(category => ctx.body = category)
}

export function updateCategory (ctx, next) {
  return CategoryService.updateCategory(ctx.params.id, ctx.request.body)
  .then(res => ctx.body = res)
}

export function removeCategory (ctx, next) {
  return CategoryService.removeCategory(ctx.params.id)
  .then(res => ctx.body = res)
}
