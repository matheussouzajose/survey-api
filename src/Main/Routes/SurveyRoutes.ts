import { adaptRoute } from '@/Main/Adapters/ExpressRouteAdapter'
import { makeAddSurveyController } from '@/Main/Factories/Controllers/Survey/AddSurveyControllerFactory'
import { adminAuth } from '@/Main/Middlewares/AdminAuth'
import { auth } from '@/Main/Middlewares/Auth'
import { makeLoadSurveysController } from '@/Main/Factories/Controllers/Survey/LoadSurveysControllerFactory'
import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/surveys', adminAuth, adaptRoute(makeAddSurveyController()))
  router.get('/surveys', auth, adaptRoute(makeLoadSurveysController()))
}
