import { makeSignInController } from '@/Main/Factories/Controllers/User/SignInControllerFactory'
import { RequiredFieldValidation } from '@/Validation/Validators/RequiredFieldValidation'
import { EmailValidation } from '@/Validation/Validators/EmailValidation'
import { EmailValidatorAdapter } from '@/Infra/Validators/EmailValidatorAdapter'
import { ValidationComposite } from '@/Validation/Validators/ValidationComposite'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'

jest.mock('@/Validation/Validators/ValidationComposite')

describe('LoginValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignInController()
    const validations: ValidationProtocol[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
