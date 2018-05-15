import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const UserShipAddressSchema = new Schema({
  firstName: String,
  lastName: String,
  // city: String,
  street: String,
  streetNumber: String,
  entrance: String,
  level: String,
  apartment: String,

  entranceCode: String
}, { versionKey: false })

export default UserShipAddressSchema
