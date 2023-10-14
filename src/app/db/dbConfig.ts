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
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

export { connect }
