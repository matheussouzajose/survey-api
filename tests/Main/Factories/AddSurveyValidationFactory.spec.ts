import { makeAddSurveyValidation } from '@/Main/Factories/Controllers/Survey/AddSurveyValidationFactory'
import { RequiredFieldValidation } from '@/Validation/Validators/RequiredFieldValidation'
import { ValidationComposite } from '@/Validation/Validators/ValidationComposite'
import { type ValidationProtocol } from '@/Presentation/Protocols/ValidationProtocol'

jest.mock('@/Validation/Validators/ValidationComposite')

describe('AddSurveyValidation Factory', () => {
  test('Should call ValidationComposite with all validations', () => {
    makeAddSurveyValidation()
    const validations: ValidationProtocol[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
