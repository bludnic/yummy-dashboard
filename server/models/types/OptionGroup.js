import mongoose from 'mongoose'

import Option from './Option'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OptionGroupSchema = new Schema({
  name: String,
  multiselect: Boolean,
  min: Boolean,
  max: Boolean,
  options: [Option]
}, { versionKey: false })

export default OptionGroupSchema