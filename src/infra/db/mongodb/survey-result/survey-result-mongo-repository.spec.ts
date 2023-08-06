import { type Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { SurveyResultMongoRepository } from './survey-result-mongo-repository'
import { type SurveyModel } from '@/domain/models/survey'

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const makeSurvey = async (): Promise<SurveyModel> => {
  const result = await surveyCollection.insertOne({
    question: 'any_question',
    answers: [{
      image: 'any_string',
      answer: 'any_answer'
    }, {
      image: 'another_string',
      answer: 'another_string'
    }],
    date: new Date()
  })

  const survey = await surveyCollection.findOne({ _id: result.insertedId })
  return MongoHelper.map(survey)
}

const makeAccount = async (): Promise<SurveyModel> => {
  const result = await accountCollection.insertOne({
    name: 'any_name',
    email: 'any_email@mail.com',
    password: 'any_password'
  })

  const account = await accountCollection.findOne({ _id: result.insertedId })
  return MongoHelper.map(account)
}

let surveyCollection: Collection
let surveyResultCollection: Collection
let accountCollection: Collection
describe('Survey Result Mongo Repository', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api'
    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should return an save survey result success', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[0].answer,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBeTruthy()
      expect(surveyResult.answer).toBe(survey.answers[0].answer)
    })

    test('Should update survey if its not new', async () => {
      const survey = await makeSurvey()
      const account = await makeAccount()
      const result = await surveyResultCollection.insertOne({
        surveyId: MongoHelper.objectId(survey.id),
        accountId: MongoHelper.objectId(account.id),
        answer: survey.answers[0].answer,
        date: new Date()
      })

      const sut = makeSut()
      const surveyResult = await sut.save({
        surveyId: survey.id,
        accountId: account.id,
        answer: survey.answers[1].answer,
        date: new Date()
      })

      expect(surveyResult).toBeTruthy()
      expect(surveyResult.id).toBe(result.insertedId.toHexString())
      expect(surveyResult.answer).toBe(survey.answers[1].answer)
    })
  })
})
