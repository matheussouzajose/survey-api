import { makeSignUpValidation } from '@/Main/Factories/Controllers/User/SignupValidationFactory'
import { RequiredFieldValidation } from '@/Validation/Validators/RequiredFieldValidation'
import { CompareFieldsValidation } from '@/Validation/Validators/CompareFieldsValidation'
import { EmailValidation } from '@/Validation/Validators/EmailValidation'
import { EmailValidatorAdapter } from '@/Infra/Validators/EmailValidatorAdapter'
import { ValidationComposite } from '@/Validation/Validators/ValidationComposite'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'

jest.mock('@/Validation/Validators/ValidationComposite')

describe('SignUpValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeSignUpValidation()
    const validations: ValidationProtocol[] = []
    for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
    validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
