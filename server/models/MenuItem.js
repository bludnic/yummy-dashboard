import mongoose from 'mongoose'

import MenuItemPrice from './types/MenuItemPrice'
import OptionGroup from './types/OptionGroup'
import schemaMethods from './methods/menuItem'
import schemaValidate from './validate/menuItem'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const MenuItemSchema = new Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  prices: [MenuItemPrice],
  weight: Number, // in gramms

  // featuredImage: String,
  featuredImageKey: String,
  images: [String],
  isFeatured: Boolean,

  optionGroups: [OptionGroup],
  pizzaGroups: [],

  category: { type: ObjectId, ref: 'Category' }
}, { versionKey: false, timestamps: true, toJSON: { virtuals: true } })

/**
 * Virtuals
 */
MenuItemSchema.virtual('featuredImageURL').get(function () {
  const AWS_BUCKET = process.env.AWS_BUCKET
  const AWS_REGION = process.env.AWS_REGION
  if (this.featuredImageKey) {
    return `http://${AWS_BUCKET}.s3-website.${AWS_REGION}.amazonaws.com/${this.featuredImageKey}`
  }
  return null
})

MenuItemSchema.virtual('featuredImageSquare').get(function () {
  const AWS_BUCKET = process.env.AWS_BUCKET
  const AWS_REGION = process.env.AWS_REGION
  const size = '75x75'
  if (this.featuredImageKey) {
    return `http://${AWS_BUCKET}.s3-website.${AWS_REGION}.amazonaws.com/${size}/${this.featuredImageKey}`
  }
  return null
})

/*
 * Plugins
 */
MenuItemSchema.plugin(schemaMethods) // schema methods
MenuItemSchema.plugin(schemaValidate) // schema validation

export default mongoose.model('MenuItem', MenuItemSchema)
