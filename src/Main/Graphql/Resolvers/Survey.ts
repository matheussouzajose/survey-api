import { adaptResolver } from '@/Main/Adapters/ApolloServerResolverAdapter'
import { makeLoadSurveysController } from '@/Main/Factories/Controllers/Survey/LoadSurveysControllerFactory'

export default {
  Query: {
    surveys: async (parent: any, args: any, context: any) => adaptResolver(makeLoadSurveysController(), args, context)
  }
}
