import mongoose from 'mongoose'

import { currencies } from './util/options'
import schemaMethods from './methods/options'
import schemaValidate from './validate/options'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OptionSchema = new Schema({
  _id: { type: String, required: true }, // options

  // general options
  deliveryPrice: { type: Number, default: 0 },
  freeShippingFrom: { type: Number, default: 0 },
  deliveryTime: { type: Number }, // in minutes

  // store options
  storeAddress1: String,
  storeAddress2: String,
  storeCity: String,
  storeCountry: String,
  storePostcode: String,

  // currency options
  currency: { type: String, enum: currencies, default: 'USD' },
  currencyPosition: { type: String, enum: ['left', 'right', 'leftSpace', 'rightSpace'], default: 'left' },
  currencyThSeperator: { type: String, enum: [',', '.'], default: '.' }, // Thousand separator
  currencyDecSeperator: { type: String, enum: [',', '.'], default: ',' }, // Decimal separator
  currencyNumDec: { type: Number, default: 2 },

  // payment options
  paymentStripeKey: String,
  paymentPaypalKey: String
}, { versionKey: false })

/*
 * Plugins
 */
OptionSchema.plugin(schemaMethods) // schema methods
OptionSchema.plugin(schemaValidate) // schema validation

export default mongoose.model('Options', OptionSchema)
