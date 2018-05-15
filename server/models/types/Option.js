import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OptionSchema = new Schema({
  name: String,
  price: Number,
  prices: [Number]
}, { versionKey: false })

export default OptionSchema