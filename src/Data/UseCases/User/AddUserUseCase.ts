import { type AddUser, type AddUserProtocol } from '@/Domain/UseCases/User/AddUserProtocol'
import { type AddUserRepositoryProtocol } from '@/Data/Protocols/Repository/User/AddUserRepositoryProtocol'
import { type CheckUserByEmailRepositoryProtocol } from '@/Data/Protocols/Repository/User/CheckUserByEmailRepositoryProtocol'
import { type HasherProtocol } from '@/Data/Protocols/Criptography/HasherProtocol'

export class AddUserUseCase implements AddUserProtocol {
  constructor (
    private readonly hasher: HasherProtocol,
    private readonly addUserRepository: AddUserRepositoryProtocol,
    private readonly checkUserByEmailRepository: CheckUserByEmailRepositoryProtocol
  ) {}

  async add (userData: AddUser.Params): Promise<AddUser.Result> {
    const exists = await this.checkUserByEmailRepository.checkByEmail(userData.email)
    let isValid = false
    if (!exists) {
      const hashedPassword = await this.hasher.hash(userData.password)
      isValid = await this.addUserRepository.add({ ...userData, password: hashedPassword })
    }
    return isValid
  }
}
