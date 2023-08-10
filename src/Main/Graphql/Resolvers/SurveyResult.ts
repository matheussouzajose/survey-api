import { adaptResolver } from '@/Main/Adapters/ApolloServerResolverAdapter'
import {
  makeLoadSurveyResultController
} from '@/Main/Factories/Controllers/SurveyResult/LoadSurveyResultControllerFactory'
import {
  makeSaveSurveyResultController
} from '@/Main/Factories/Controllers/SurveyResult/SaveSurveyResultControllerFactory'

export default {
  Query: {
    surveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeLoadSurveyResultController(), args, context)
  },

  Mutation: {
    saveSurveyResult: async (parent: any, args: any, context: any) => adaptResolver(makeSaveSurveyResultController(), args, context)
  }
}
