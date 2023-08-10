import { ValidationComposite } from '@/Validation/Validators/ValidationComposite'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'
import { RequiredFieldValidation } from '@/Validation/Validators/RequiredFieldValidation'
import { CompareFieldsValidation } from '@/Validation/Validators/CompareFieldsValidation'
import { EmailValidation } from '@/Validation/Validators/EmailValidation'
import { EmailValidatorAdapter } from '@/Infra/Validators/EmailValidatorAdapter'

export const makeSignUpValidation = (): ValidationComposite => {
  const validations: ValidationProtocol[] = []
  for (const field of ['name', 'email', 'password', 'passwordConfirmation']) {
    validations.push(new RequiredFieldValidation(field))
  }
  validations.push(new CompareFieldsValidation('password', 'passwordConfirmation'))
  validations.push(new EmailValidation('email', new EmailValidatorAdapter()))
  return new ValidationComposite(validations)
}
