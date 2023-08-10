import { type Router } from 'express'
import { auth } from '@/Main/Middlewares/Auth'
import { adaptRoute } from '@/Main/Adapters/ExpressRouteAdapter'
import {
  makeSaveSurveyResultController
} from '@/Main/Factories/Controllers/SurveyResult/SaveSurveyResultControllerFactory'
import {
  makeLoadSurveyResultController
} from '@/Main/Factories/Controllers/SurveyResult/LoadSurveyResultControllerFactory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', auth, adaptRoute(makeSaveSurveyResultController()))
  router.get('/surveys/:surveyId/results', auth, adaptRoute(makeLoadSurveyResultController()))
}
