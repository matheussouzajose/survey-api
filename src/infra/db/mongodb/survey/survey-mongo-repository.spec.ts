import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { type Collection } from 'mongodb'

let accountCollection: Collection
describe('Survey Mongo Repository', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api'
    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  const makeSut = (): SurveyMongoRepository => {
    return new SurveyMongoRepository()
  }

  test('Should return an add survey on add success', async () => {
    const sut = makeSut()
    const account = await sut.add({
      question: 'any_question',
      answers: [{
        image: 'any_string',
        answer: 'any_answer'
      }]
    })

    expect(account).toBeTruthy()
    expect(account.id).toBeTruthy()
    expect(account.question).toBe('any_question')
    expect(account.answers).toEqual([{
      image: 'any_string',
      answer: 'any_answer'
    }])
  })
})
