import mongoose from 'mongoose'

async function connect() {
  try {
    mongoose.connect(process.env.MONGO_URI!)
    const connection = mongoose.connection

    connection.on('connected', () => {
      console.log('MongoDB connection established successfully')
    })

    connection.on('error', (error) => {
      console.log('Error connecting to MongoDB', error)
      process.exit(1)
    })
  } catch (err) {
    if (err instanceof Error) {
      console.error(err.message)
    }
    process.exit(1)
  }
}

export { connect }
