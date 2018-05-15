import mongoose from 'mongoose'

import OrderOption from './OrderOption'
import { getOptionGroupById } from './../util/order'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const OrderOptionGroupSchema = new Schema({
  id: String, // OptionGroupID
  options: [OrderOption]
}, { versionKey: false, toObject: { virtuals: true }, toJSON: { virtuals: true } })

OrderOptionGroupSchema.virtual('groupRef').get(function () {
  const lineItem = this.parent()
  const optionGroupId = this.id

  return getOptionGroupById(lineItem.menuItem, optionGroupId)
})

OrderOptionGroupSchema.virtual('groupTotalPrice').get(function () {
  let total = 0
  this.options.forEach(option => {
    total += option.optionTotalPrice
  })
  return total
})

export default OrderOptionGroupSchema