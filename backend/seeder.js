// Added {"type": "module"} in package.json, so we can use import for ES module
// js files should add (.js), SAME THING WE CAN DO IN (server.js)

import dotenv from 'dotenv'
import colors from 'colors'
import users from './data/user.js'
import products from './data/products.js'
import User from './models/userModel.js'
import Product from './models/productModel.js'
import Order from './models/orderModel.js'
import connectDB from './config/db.js'

dotenv.config()

connectDB()

const importData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    const createdUsers = await User.insertMany(users)

    const adminUser = createdUsers[0]._id

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser,
    }))

    await Product.insertMany(sampleProducts)

    console.log('Data Imported!'.green.inverse)

    process.exit()
  } catch (err) {
    console.error(`${err}`.red.inverse)
    // We want exit with failure, so pass into 1
    process.exit(1)
  }
}

const destroyData = async () => {
  try {
    await Order.deleteMany()
    await Product.deleteMany()
    await User.deleteMany()

    console.log('Data Destroyed!'.red.inverse)

    process.exit()
  } catch (err) {
    console.error(`${err}`.red.inverse)
    // We want exit with failure, so pass into 1
    process.exit(1)
  }
}

if (process.argv[2] === '-d' && process.argv[3] == 'hi') {
  destroyData()
} else {
  importData()
}
