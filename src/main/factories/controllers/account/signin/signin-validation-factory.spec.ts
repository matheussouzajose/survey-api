import { type EmailValidator } from '@/validation/protocols/email-validator'
import { makeSignInController } from '@/main/factories/controllers/account/signin/signin-controller-factory'
import { type Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { EmailValidation } from '@/validation/validators/email-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

jest.mock('@/validation/validators/validation-composite')

const makeEmailValidator = (): EmailValidator => {
  class EmailValidatorStub implements EmailValidator {
    isValid (email: string): boolean {
      return true
    }
  }

  return new EmailValidatorStub()
}

describe('SignInValidation Factory', () => {
  test('Should call validationComposite with all validations', () => {
    makeSignInController()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', makeEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
