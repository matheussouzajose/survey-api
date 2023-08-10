import { ValidationComposite } from '@/Validation/Validators/ValidationComposite'
import { RequiredFieldValidation } from '@/Validation/Validators/RequiredFieldValidation'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: ValidationProtocol[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
