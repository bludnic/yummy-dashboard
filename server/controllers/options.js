import OptionsService from './../services/options'

export function getOptions (ctx, next) {
  return OptionsService.getOptions()
  .then(options => ctx.body = options)
}

export function saveOptions (ctx, next) {
  return OptionsService.saveOptions(ctx.request.body)
  .then(res => ctx.body = res)
}