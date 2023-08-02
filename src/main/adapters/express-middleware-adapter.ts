import { type HttpRequest } from '@/presentation/protocols'
import { type NextFunction, type Request, type Response } from 'express'
import { type Middleware } from '@/presentation/protocols/middleware'

export const adaptMiddleware = (middleware: Middleware) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const httpRequest: HttpRequest = {
      headers: req.headers
    }

    const httpResponse = await middleware.handle(httpRequest)
    if ([200].includes(httpResponse.statusCode)) {
      Object.assign(req, httpResponse.body)
      next()
      return
    }

    let message = httpResponse.body.message
    if (httpResponse.body.stack.includes('JsonWebTokenError')) {
      message = 'invalid format token'
    }

    return res.status(httpResponse.statusCode).json({
      message
    })
  }
}
