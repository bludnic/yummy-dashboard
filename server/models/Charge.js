import mongoose from 'mongoose'

const Schema = mongoose.Schema
const ObjectId = Schema.ObjectId

const ChargeSchema = new Schema({
  method: String, // stripe, paypal, braintree
  transactionId: String,
  amount: Number,
  paid: { type: Boolean, default: false }
}, { versionKey: false, timestamps: true, toJSON: { virtuals: true } })

export default mongoose.model('Charge', ChargeSchema)
