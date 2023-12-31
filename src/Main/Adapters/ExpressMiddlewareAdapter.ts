import { type Request, type Response, type NextFunction } from 'express'
import { type MiddlewareProtocol } from '@/Presentation/Protocols/MiddlewareProtocol'

export const adaptMiddleware = (middleware: MiddlewareProtocol) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const request = {
      accessToken: req.headers?.['x-access-token'],
      ...(req.headers || {})
    }
    const httpResponse = await middleware.handle(request)
    if (httpResponse.statusCode === 200) {
      Object.assign(req, httpResponse.body)
      next()
      return
    }
    res.status(httpResponse.statusCode).json({
      error: httpResponse.body.message
    })
  }
}
