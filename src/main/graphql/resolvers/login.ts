import { adaptResolver } from '@/main/adapters/apollo-server-resolver-adapter'
import { makeSignUpController } from '@/main/factories/controllers/account/signup-controller-factory'
import { makeSignInController } from '@/main/factories/controllers/account/signin-controller-factory'

export default {
  Query: {
    login: async (parent: any, args: any) => adaptResolver(makeSignInController(), args)
  },

  Mutation: {
    signUp: async (parent: any, args: any) => adaptResolver(makeSignUpController(), args)
  }
}
