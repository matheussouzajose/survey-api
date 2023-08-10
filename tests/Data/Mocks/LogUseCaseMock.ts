import { type LogErrorRepositoryProtocol } from '@/Data/Protocols/Repository/Log/LogErrorRepositoryProtocol'

export class LogErrorRepositorySpy implements LogErrorRepositoryProtocol {
  stack: string

  async logError (stack: string): Promise<void> {
    this.stack = stack
  }
}
