import { env } from '../env/env'
import { app } from './app'

app
  .listen({
    port: env.PORT,
  })
  .then(() => {
    console.log(`Server is running on ${env.NODE_ENV} and port ${env.PORT}`)
  })
