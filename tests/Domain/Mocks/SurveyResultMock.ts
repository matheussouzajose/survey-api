import { type SurveyResult } from '@/Domain/Models/SurveyResult'
import { type SaveSurveyResult } from '@/Domain/UseCases/SurveyResult/SaveSurveyResultProtocol'
import faker from 'faker'

export const mockSaveSurveyResultParams = (): SaveSurveyResult.Params => ({
  userId: faker.datatype.uuid(),
  surveyId: faker.datatype.uuid(),
  answer: faker.random.word(),
  date: faker.date.recent()
})

export const mockSurveyResultModel = (): SurveyResult => ({
  surveyId: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    count: faker.datatype.number({ min: 0, max: 1000 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentUserAnswer: faker.datatype.boolean()
  }, {
    answer: faker.random.word(),
    image: faker.image.imageUrl(),
    count: faker.datatype.number({ min: 0, max: 1000 }),
    percent: faker.datatype.number({ min: 0, max: 100 }),
    isCurrentUserAnswer: faker.datatype.boolean()
  }],
  date: faker.date.recent()
})

export const mockEmptySurveyResultModel = (): SurveyResult => ({
  surveyId: faker.datatype.uuid(),
  question: faker.random.words(),
  answers: [{
    answer: faker.random.word(),
    count: 0,
    percent: 0,
    isCurrentUserAnswer: false
  }, {
    answer: faker.random.word(),
    image: faker.image.imageUrl(),
    count: 0,
    percent: 0,
    isCurrentUserAnswer: false
  }],
  date: faker.date.recent()
})
