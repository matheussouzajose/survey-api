import { type Request, type Response, type NextFunction } from 'express'

export const cors = (req: Request, res: Response, next: NextFunction): void => {
  res.set('account-control-allow-origin', '*')
  res.set('account-control-allow-methods', '*')
  res.set('account-control-allow-headers', '*')
  next()
}
