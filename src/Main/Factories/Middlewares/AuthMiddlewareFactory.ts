import { AuthMiddleware } from '@/Presentation/Middlewares/AuthMiddleware'
import { type MiddlewareProtocol } from '@/Presentation/Protocols/MiddlewareProtocol'
import {
  makeLoadUserByTokenUseCase
} from '@/Main/Factories/UseCases/User/LoadUserByTokenUseCaseFactory'
import { makeLogControllerDecorator } from '@/Main/Factories/Decorators/LogControllerDecoratorFactory'

export const makeAuthMiddleware = (role?: string): MiddlewareProtocol => {
  const authMiddleware = new AuthMiddleware(makeLoadUserByTokenUseCase(), role)
  return makeLogControllerDecorator(authMiddleware)
}
