import mongoose from 'mongoose'

import schemaMethods from './methods/coupon'
import schemaValidate from './validate/coupon'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const CouponSchema = new Schema({
  _id: { type: String, required: true }, // _id is code
  discountType: { type: String, required: true, enum: ['percent', 'number'], default: 'percent' }, // percent or number
  discount: { type: Number, required: true }
}, { versionKey: false })

/*
 * Plugins
 */
CouponSchema.plugin(schemaMethods) // schema methods
CouponSchema.plugin(schemaValidate) // schema validation

export default mongoose.model('Coupon', CouponSchema)
