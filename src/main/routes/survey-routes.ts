import { type Router } from 'express'
import { adaptRoute } from '../adapters/express-route-adapter'
import { makAddSurveyController } from '../factories/controllers/survey/add-survey/survey-controller-factory'
import { adaptMiddleware } from '../adapters/express-middleware-adapter'
import { makeAuthMiddleware } from '../factories/middlewares/auth-middleware-factory'

export default (router: Router): void => {
  const adminAuth = adaptMiddleware(makeAuthMiddleware())
  router.post('/surveys', adminAuth, adaptRoute(makAddSurveyController()))
}
