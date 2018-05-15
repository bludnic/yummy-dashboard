import mongoose from 'mongoose'

import OrderOptionGroup from './OrderOptionGroup'
import { getMenuItemPrice } from './../util/order'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OrderItemSchema = new Schema({
  quantity: Number,
  size: String,
  optionGroups: [OrderOptionGroup],
  menuItem: { type: ObjectId, ref: 'MenuItem' }
}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } })

OrderItemSchema.virtual('itemPrice').get(function () {
  const price = getMenuItemPrice(this.menuItem, this.size)

  return price
})

OrderItemSchema.virtual('optionsTotalPrice').get(function () {
  let total = 0

  this.optionGroups.forEach(optionGroup => {
    total += optionGroup.groupTotalPrice
  })

  return total
})

OrderItemSchema.virtual('lineItemPrice').get(function () {
  return this.itemPrice + this.optionsTotalPrice
})

OrderItemSchema.virtual('lineItemTotal').get(function () {
  return this.lineItemPrice * this.quantity
})


export default OrderItemSchema