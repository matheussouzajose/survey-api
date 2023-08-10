import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import { type LogErrorRepositoryProtocol } from '@/Data/Protocols/Repository/Log/LogErrorRepositoryProtocol'

export class LogMongoRepository implements LogErrorRepositoryProtocol {
  async logError (stack: string): Promise<void> {
    const errorCollection = await MongoHelper.getCollection('errors')
    await errorCollection.insertOne({
      stack,
      date: new Date()
    })
  }
}
