import { adaptRoute } from '@/Main/Adapters/ExpressRouteAdapter'
import { makeSignUpController } from '@/Main/Factories/Controllers/User/SignUpControllerFactory'
import { makeSignInController } from '@/Main/Factories/Controllers/User/SignInControllerFactory'
import { type Router } from 'express'

export default (router: Router): void => {
  router.post('/signup', adaptRoute(makeSignUpController()))
  router.post('/signin', adaptRoute(makeSignInController()))
}
