import MenuItemService from './../services/menuItem'

export function getMenuItems (ctx, next) {
  const { category } = ctx.query
  return MenuItemService.getMenuItems({ category })
  .then(menuItems => ctx.body = menuItems)
}

export function createMenuItem (ctx, next) {
  return MenuItemService.createMenuItem(ctx.request.body)
  .then(menuItem => ctx.body = menuItem)
}

export function getMenuItem (ctx, next) {
  return MenuItemService.getMenuItem(ctx.params.id)
  .then(menuItem => ctx.body = menuItem)
}

export function updateMenuItem (ctx, next) {
  return MenuItemService.updateMenuItem(ctx.params.id, ctx.request.body)
  .then(res => ctx.body = res)
}

export function removeMenuItem (ctx, next) {
  return MenuItemService.removeMenuItem(ctx.params.id)
  .then(res => ctx.body = res)
}
