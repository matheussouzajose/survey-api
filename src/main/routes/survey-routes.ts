import { type Router } from 'express'
import { adaptRoute } from '../adapters/express/express-route-adapter'
import { makAddSurveyController } from '../factories/controllers/survey/add-survey/survey-controller-factory'

export default (router: Router): void => {
  router.post('/surveys', adaptRoute(makAddSurveyController()))
}
