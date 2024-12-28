import express from 'express'
import morgan from 'morgan'
import connectDB from './DB/connection.js'

connectDB

const app = express()

async function expressServer() {
  
  app.use(express.json())
  app.use(morgan('dev'))

  const PORT = process.env.PORT || 5000

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

}


export default expressServer
