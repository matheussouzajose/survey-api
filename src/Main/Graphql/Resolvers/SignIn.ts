import { adaptResolver } from '@/Main/Adapters/ApolloServerResolverAdapter'
import { makeSignUpController } from '@/Main/Factories/Controllers/User/SignUpControllerFactory'
import { makeSignInController } from '@/Main/Factories/Controllers/User/SignInControllerFactory'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeSignInController(), args)
  },

  Mutation: {
    signUp: async (parent: any, args: any) => adaptResolver(makeSignUpController(), args)
  }
}
