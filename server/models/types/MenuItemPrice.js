import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const MenuItemPriceSchema = new Schema({
  name: String,
  price: Number
}, { versionKey: false })

export default MenuItemPriceSchema