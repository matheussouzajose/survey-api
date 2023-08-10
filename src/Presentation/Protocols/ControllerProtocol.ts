import { type HttpResponse } from '@/Presentation/Protocols/HttpProtocol'

export interface ControllerProtocol<T = any> {
  handle: (request: T) => Promise<HttpResponse>
}
