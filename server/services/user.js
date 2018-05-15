import User from './../models/User'
import AppError from './../errors/AppError'

export default {
  getUsers ({ page, perPage }) {
    return User.find({}).exec()
  },
  createUser (payload) {
    return User.create(payload)
  },
  getUser (id) {
    console.log('getUser', id)
    return User.findById(id).exec()
    .then(res => {
      console.log('user', res);
      if (!res) throw new AppError('Item not found', 404)
      return res
    })
  },
  updateUser (id, payload) {
    return User.findByIdAndUpdate(id, payload).exec()
    .then(res => {
      if (!res) throw new AppError('Item not found', 404)
      return res
    })
  },
  deleteUser (id) {
    return User.findByIdAndRemove(id)
    .then(res => {
      if (!res) throw new AppError('Item not found', 404)
      return res
    })
  },


  authFacebook (profile) {
    const email = profile.emails[0].value
    const displayName = profile.displayName.split(' ')
    const firstName = displayName[0]
    const lastName = displayName[1]

    return User.findOne({ email }).exec()
    .then(user => {
      if (user) {
        // If user exists, update profile
        return User.findOneAndUpdate({ email }, { firstName, lastName }, { new: true }).exec()
      } else {
        // If user with this email not found, then register
        return User.create({ email, firstName, lastName })
      }
    })
  },
  
  authenticate (email, password) {
    return User.findOne({ email }).exec()
    .then(user => {
      if (user && user.checkPassword(password)) {
        return user
      } else {
        throw new AppError('User not found or incorect password', 400)
      }
    })
  },
  getProfile (id) {
    return User.findById(id).select(['_id', 'email', 'role']).exec()
    .then(user => {
      if (user) {
        return {
          id: user._id,
          email: user.email,
          role: user.role
        }
      } else {
        throw new AppError('This user was disabled by admin', 400)
      }
    })
  }
}
