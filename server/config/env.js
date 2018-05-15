
console.log('server process.env.NODE_ENV', process.env.NODE_ENV)
import dotenv from 'dotenv'  

// Test database
if (process.env.NODE_ENV === 'test') {
  console.log('=test')
  dotenv.config({ path: '.env.test', silent: true })
} else {
  console.log('=else')
  dotenv.config({ path: '.env', silent: true })
}

console.log('Database:', process.env.MONGODB_URI)