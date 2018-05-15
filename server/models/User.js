import mongoose from 'mongoose'

import transformID from './util/transformID'
import UserShipAddress from './types/UserShipAddress'
import schemaMethods from './methods/user'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const defaultShipAddress = {
  firstName: '',
  lastName: '',
  street: '',
  streetNumber: '',
  entrance: '',
  level: '',
  apartment: '',
  entranceCode: ''
}

const UserSchema = new Schema({
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  phone: { type: String },

  passwordHash: String,
  salt: String,
  
  shipAddress: { type: UserShipAddress, default: defaultShipAddress },

  provider: String,
  role: { type: String, default: 'user' }
}, { versionKey: false, toJSON: { transform: transformID }})

/*
 * Plugins
 */
UserSchema.plugin(schemaMethods) // schema methods

export default mongoose.model('User', UserSchema)
