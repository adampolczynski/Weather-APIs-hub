import express, { Express } from 'express'
import { predictionsController } from './controllers'

const port = process.env.PORT
const app: Express = express()

if (!process.env.RAPID_API_KEY) {
  console.log('No RapidApi key provided')
} else {
  app.use('/predictions', predictionsController)
  app.listen(port, () => {
    console.log(`Running on port ${port}, go to /predictions/:Warsaw,PL to get some data`)
  })
}

export default app
