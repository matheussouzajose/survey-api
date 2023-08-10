import { LogMongoRepository } from '@/Infra/Db/MongoDb/Log/LogMongoRepository'
import { LogControllerDecorator } from '@/Main/Decorators/LogControllerDecorator'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'

export const makeLogControllerDecorator = (controller: ControllerProtocol): ControllerProtocol => {
  const logMongoRepository = new LogMongoRepository()
  return new LogControllerDecorator(controller, logMongoRepository)
}
