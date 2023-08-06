import { makeSurveyValidation } from '@/main/factories/controllers/survey/add-survey/survey-validation-factory'
import { type Validation } from '@/presentation/protocols/validation'
import { RequiredFieldValidation } from '@/validation/validators/required-field-validation'
import { ValidationComposite } from '@/validation/validators/validation-composite'

jest.mock('@/validation/validators/validation-composite')

describe('SurveyValidation Factory', () => {
  test('Should call validationComposite with all validations', () => {
    makeSurveyValidation()
    const validations: Validation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
