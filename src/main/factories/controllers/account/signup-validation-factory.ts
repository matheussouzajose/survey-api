import { ValidationComposite } from '@/validation/validators/validation-composite'
import { type Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { CompareFieldsValidation } from '@/validation/validators/compare-fields-validation'
import { EmailValidation } from '@/validation/validators/email-validation'
import { EmailValidatorAdapter } from '@/infra/validators/email-validator-adapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: Validation[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
