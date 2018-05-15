import crypto from 'crypto'

// https://habrahabr.ru/post/324066/
export default (schema, options) => {

  schema.virtual('password')
  .set(function (password) {
    this._plainPassword = password
    if (password) {
      this.salt = crypto.randomBytes(128).toString('base64')
      this.passwordHash = crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1')
    } else {
      this.salt = undefined
      this.passwordHash = undefined
    }
  })
  .get(function () {
    return this._plainPassword
  })

  schema.methods.checkPassword = function (password) {
    if (!password) return false
    if (!this.passwordHash) return false
    return crypto.pbkdf2Sync(password, this.salt, 1, 128, 'sha1') == this.passwordHash
  }
  
}