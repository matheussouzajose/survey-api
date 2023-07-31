import { makeSurveyValidation } from './survey-validation-factory'
import { type Validation } from '../../../../../presentation/protocols'
import { ValidationComposite, RequiredFieldValidation } from '../../../../../validation/validators'

jest.mock('../../../../../validation/validators/validation-composite')

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
