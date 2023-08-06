import { type Router } from 'express'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import {
  makeSaveSurveyResultController
} from '@/main/factories/controllers/survey-result/save-surver-result/save-survey-result-controller-factory'

export default (router: Router): void => {
  router.put('/surveys/:surveyId/results', adminAuth, adaptRoute(makeSaveSurveyResultController()))
}
