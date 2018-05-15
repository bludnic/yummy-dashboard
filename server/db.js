import mongoose from 'mongoose'

mongoose.Promise = Promise
mongoose.set('debug', true)

mongoose.connect(process.env.MONGODB_URI)
console.log('DB', process.env.MONGODB_URI)

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'))

export default db