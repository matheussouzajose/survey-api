import { type Router } from 'express'
import { adminAuth } from '@/main/middlewares/admin-auth'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeAddSurveyController } from '@/main/factories/controllers/survey/add-survey/survey-controller-factory'
import { auth } from '@/main/middlewares/auth'
import {
  makeLoadSurveysController
} from '@/main/factories/controllers/survey/load-surveys/load-surveys-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
