import User from './../models/User'
import AppError from './../errors/AppError'
import { generateJWT } from './../config/passport'

const selectedFields = {
  'id': 1,
  'firstName': 1,
  'lastName': 1,
  'email': 1,
  'phone': 1,
  'shipAddress': 1
}

export default {
  registerUser (payload) {
    return User.create(payload)
    .then(user => {
      if (user) {
        const token = generateJWT(user)
        return { user: {
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          email: user.email,
        }, token }
      } else {
        throw new AppError('Can not create new User', 400)
      }
    })
    .catch(err => {
      throw new AppError('This user already exists', 400)
    })
  },
  getProfile (id) {
    return User.findById(id, selectedFields).exec()
    .then(user => {
      if (user) {
        return user
      } else {
        throw new AppError('This user was disabled by admin', 400)
      }
    })
  },
  updateProfile (id, payload) {
    return User.findByIdAndUpdate(id, payload, { select: selectedFields, new: true }).exec()
    .then(res => {
      if (!res) throw new AppError('Item not found', 404)
      return res
    })
  },
}
