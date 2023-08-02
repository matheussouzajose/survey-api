import { InvalidParamError } from '@/presentation/errors'
import { CompareFieldsValidation } from './compare-fields-validation'

const makeSut = (): CompareFieldsValidation => {
  return new CompareFieldsValidation('field', 'fieldCompareToName')
}
describe('CompareFieldsValidation Validation', () => {
  test('Should return a InvalidParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldCompareToName: 'another_field' })
    expect(error).toEqual(new InvalidParamError('fieldCompareToName'))
  })

  test('Should not return if validation succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', fieldCompareToName: 'any_name' })
    expect(error).toBeFalsy()
  })
})
