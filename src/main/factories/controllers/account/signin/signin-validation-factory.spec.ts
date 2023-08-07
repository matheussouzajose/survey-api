import { makeSignInController } from '@/main/factories/controllers/account/signin/signin-controller-factory'
import { type Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { EmailValidation } from '@/validation/validators/email-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'
import { mockEmailValidator } from '@/validation/test/mock-validators'

jest.mock('@/validation/validators/validation-composite')

describe('SignInValidation Factory', () => {
  test('Should call validationComposite with all validations', () => {
    makeSignInController()
    const validations: Validation[] = []
    for (const field of ['email', 'password']) {
      validations.push(new RequiredFieldValidation(field))
    }
    validations.push(new EmailValidation('email', mockEmailValidator()))
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
