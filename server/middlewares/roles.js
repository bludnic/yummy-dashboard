import Roles from 'koa-roles'
import AppError from './../errors/AppError'
import OrderService from './../services/order'

const roles = new Roles({
  async failureHandler(ctx, action) {
    throw new AppError(`Access Denied - You don't have permission to: ${action}`, 403)
  }
})

// anonymous users can only access the home page
// returning false stops any more rules from being
// considered
roles.use(async (ctx, action) => {
  console.log('access public middleware', ctx.user);
  return ctx.user || action === 'access public routes'
})

// Can access order :id
roles.use('access order', async (ctx) => {
  const isOwner = await OrderService.isOwner(ctx.params.id, ctx.user.id)
  if (isOwner) return true
})

// Can access admin role
roles.use('access admin', (ctx) => {
  if (ctx.user.role === 'admin') return true
})


// moderator users can access private page, but
// they might not be the only ones so we don't return
// false if the user isn't a moderator
roles.use('access private page', ctx => {
  if (ctx.user.role === 'moderator') {
    return true;
  }
})

//admin users can access all pages
roles.use((ctx, action) => {
  if (ctx.user.role === 'admin') {
    return true;
  }
})

export default roles