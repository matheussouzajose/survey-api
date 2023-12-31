export interface LoadUserByEmailRepositoryProtocol {
  loadByEmail: (email: string) => Promise<LoadUserByEmailRepository.Result>
}

export namespace LoadUserByEmailRepository {
  export type Result = {
    id: string
    name: string
    password: string
  }
}
