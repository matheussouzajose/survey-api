export interface LoadUserByTokenRepositoryProtocol {
  loadByToken: (token: string, role?: string) => Promise<LoadUserByTokenRepository.Result>
}

export namespace LoadUserByTokenRepository {
  export type Result = {
    id: string
  }
}
