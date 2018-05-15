import mongoose from 'mongoose'

import OrderItem from './types/OrderItem'
import schemaMethods from './methods/order'
import schemaValidate from './validate/order'
import { getTotalPrice, getDiscountPrice } from './util/order'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OrderSchema = new Schema({
  items: [OrderItem],
  coupon: { type: String, ref: 'Coupon' },
  source: String,
  methods: { type: String, enum: ['cash', 'stripe', 'paypal'], default: 'cash' },
  status: { type: String, enum: ['pending', 'failed', 'processing', 'completed', 'canceled', 'ontheway'], default: 'pending' }, // https://docs.woocommerce.com/document/managing-orders/
  user: { type: ObjectId, ref: 'User' }
}, { versionKey: false, timestamps: true, toObject: { virtuals: true }, toJSON: { virtuals: true } })

/*
 * Virtuals
 */
OrderSchema.virtual('subtotal').get(function () {
  // return getTotalPrice(this.items)
  let subtotal = 0
  this.items.forEach(lineItem => {
    subtotal += lineItem.lineItemTotal
  })
  return subtotal
})

OrderSchema.virtual('total').get(function () {
  return getDiscountPrice(this.subtotal, this.coupon)
})

/*
 * Plugins
 */
OrderSchema.plugin(schemaMethods) // schema methods
OrderSchema.plugin(schemaValidate) // schema validation

export default mongoose.model('Order', OrderSchema)