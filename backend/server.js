// Added {"type": "module"} in package.json, so we can use import for ES module
// js files should add (.js)
import express from 'express'
import dotenv from 'dotenv'
import colors from 'colors'
import ConnectDB from './config/db.js'
import productRoutes from './routes/productRoutes.js'
import { notFound, errorHanlder } from './middleware/errorMiddleware.js'

dotenv.config()

ConnectDB()

const app = express()

app.get('/', (req, res) => {
  res.send('API is running ...')
})

app.use('/api/products', productRoutes)

app.use(notFound)

app.use(errorHanlder)

const PORT = process.env.PORT || 5000

app.listen(
  PORT,
  console.log(
    `Server running in ${process.env.NODE_ENV} mode on port ${PORT}`.yellow.bold
  )
)
