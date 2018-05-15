export default function transformID (doc, ret) {
  ret.id = ret._id
  delete ret._id
}