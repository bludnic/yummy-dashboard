import uuid from 'uuid'

import StorageService from './../services/storage'

export function uploadImage (ctx, next) {
  const file = ctx.request.body.files && ctx.request.body.files.image || ''
  const fileName = uuid()
  
  return StorageService.uploadImage(file, fileName)
  .then(res => ctx.body = res)
}