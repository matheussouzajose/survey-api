import { type Router } from 'express'
import { adaptRoute } from '@/main/adapters/express-route-adapter'
import { makeSignUpController } from '@/main/factories/controllers/account/signup/signup-controller-factory'
import { makeSignInController } from '@/main/factories/controllers/account/signin/signin-controller-factory'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
}
