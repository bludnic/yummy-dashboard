import mongoose from 'mongoose'

import { getOptionPrice, getOptionById } from './../util/order'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OrderOptionSchema = new Schema({
  id: String, // OptionID
  quantity: Number
}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } })

OrderOptionSchema.virtual('optionRef').get(function () {
  const lineItem = this.parent().parent()
  const optionGroupId = this.parent().group
  const optionId = this.id

  return getOptionById(lineItem.menuItem, optionGroupId, optionId)
})

OrderOptionSchema.virtual('unitPrice').get(function () {
  const lineItem = this.parent().parent()
  const optionGroup = this.parent()

  return getOptionPrice(lineItem.menuItem, optionGroup.group, this.id, lineItem.size)
})

OrderOptionSchema.virtual('optionTotalPrice').get(function () {
  return this.unitPrice * this.quantity
})

export default OrderOptionSchema