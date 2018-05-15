import UploadService from './../services/upload'

export function uploadFeaturedImage (ctx, next) {
  const file = ctx.request.body.files.image
  const newFileName = Date.now() + '.jpg'

  return UploadService.uploadImage(file, newFileName)
  .then(res => {
    ctx.body = res
  })
}