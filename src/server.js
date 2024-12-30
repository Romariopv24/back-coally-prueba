import express from 'express'
import morgan from 'morgan'
import connectDB from './DB/connection.js'
import routes from './routes/index.js'
import cors from 'cors'
import cookieParser from "cookie-parser"
import swaggerUI from 'swagger-ui-express'
import fs from 'fs'


connectDB()

const app = express()


async function expressServer() {
  const swaggerDocument = JSON.parse(fs.readFileSync('./swagger_output.json', 'utf8'));
  app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument, {
    customSiteTitle: "Coally"
  }))
  app.use(cookieParser())
  app.use(express.json())
  app.use(morgan('dev'))

    const apiPath = {
      version_api_1: '/api/v1'
  }

  const originUrls = ['*']

  const corsOptions = {
        origin: originUrls,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
        credentials: true 
    }

    app.use(cors(corsOptions))

  const PORT = process.env.PORT 

  app.use(apiPath.version_api_1, routes)

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`)
  })

}


export default expressServer
