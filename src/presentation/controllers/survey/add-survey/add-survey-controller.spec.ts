import { type Controller, type HttpRequest, type Validation, type AddSurvey } from './add-survey-controller-protocols'
import { AddSurveyController } from './add-survey-controller'

const makeValidation = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error | null {
      return null
    }
  }

  return new ValidationStub()
}
const makeAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (survey: any): Promise<null> {
      return await new Promise(resolve => { resolve(null) })
    }
  }

  return new AddSurveyStub()
}

const makeFakeHttpRequest = (): HttpRequest => {
  return {
    body: {
      question: 'any_question',
      answers: [{
        image: 'any_string',
        answer: 'any_answer'
      }]
    }
  }
}

interface SutTypes {
  sut: Controller
  validationStub: Validation
  addSurveyStub: AddSurvey
}
const makeSut = (): SutTypes => {
  const addSurveyStub = makeAddSurvey()
  const validationStub = makeValidation()
  const sut = new AddSurveyController(validationStub)

  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('AddSurvey Controller', () => {
  test('Should call Validation with correct value', async () => {
    const { sut, validationStub } = makeSut()
    const validateSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeHttpRequest()

    await sut.handle(httpRequest)
    expect(validateSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  // test('Should call AddAccount with correct values', async () => {
  //   const { sut, addSurveyStub } = makeSut()
  //   const addSpy = jest.spyOn(addSurveyStub, 'add')
  //   await sut.handle({})
  //   expect(addSpy).toHaveBeenCalledWith({})
  // })
})
