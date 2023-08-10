import { UserInputError, AuthenticationError, ForbiddenError, ApolloError } from 'apollo-server-express'
import { type ControllerProtocol } from '@/Presentation/Protocols/ControllerProtocol'

export const adaptResolver = async (controller: ControllerProtocol, args?: any, context?: any): Promise<any> => {
  const request = {
    ...(args || {}),
    userId: context?.req?.userId
  }
  const httpResponse = await controller.handle(request)
  switch (httpResponse.statusCode) {
    case 200:
    case 204: return httpResponse.body
    case 400: throw new UserInputError(httpResponse.body.message)
    case 401: throw new AuthenticationError(httpResponse.body.message)
    case 403: throw new ForbiddenError(httpResponse.body.message)
    default: throw new ApolloError(httpResponse.body.message)
  }
}
