import 'module-alias/register'
import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import env from '@/Main/Config/Env'

MongoHelper.connect(env.mongoUrl)
  .then(async () => {
    const { setupApp } = await import('./Config/App')
    const app = await setupApp()
    app.listen(env.port, () => { console.log(`Server running at http://localhost:${env.port}`) })
  })
  .catch(console.error)
