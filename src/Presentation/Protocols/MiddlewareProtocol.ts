import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'

export interface MiddlewareProtocol<T = any> {
  handle: (httpRequest: T) => Promise<HttpResponse>
}
