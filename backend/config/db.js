import mongoose from 'mongoose'

const ConnectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
      useCreateIndex: true,
    })

    console.log(`MongoDB Connected: ${conn.connection.host}`.cyan.underline)
  } catch (err) {
    console.error(`ERROR: ${err.message}`.red.underline.bold)
    process.exit(1)
  }
}

export default ConnectDB
