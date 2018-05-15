import mongoose from 'mongoose'

import schemaMethods from './methods/category'
import schemaValidate from './validate/category'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CategorySchema = new Schema({
  name: { type: String, required: true },
  slug: { type: String }
}, { versionKey: false })

/*
 * Plugins
 */
CategorySchema.plugin(schemaMethods) // schema methods
CategorySchema.plugin(schemaValidate) // schema validation

export default mongoose.model('Category', CategorySchema)
