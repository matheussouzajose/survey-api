import { SurveyMongoRepository } from './survey-mongo-repository'
import { MongoHelper } from '../helpers/mongo-helper'
import { type Collection } from 'mongodb'

const makeSut = (): SurveyMongoRepository => {
  return new SurveyMongoRepository()
}

let surveyCollection: Collection
describe('Survey Mongo Repository', () => {
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
  })

  describe('AddSurvey', () => {
    test('Should return an add survey on add success', async () => {
      const sut = makeSut()
      const survey = await sut.add({
        question: 'any_question',
        answers: [{
          image: 'any_string',
          answer: 'any_answer'
        }, {
          answer: 'another_answer'
        }],
        date: new Date()
      })

      expect(survey).toBeTruthy()
      expect(survey.id).toBeTruthy()
      expect(survey.question).toBe('any_question')
      expect(survey.answers).toEqual([{
        image: 'any_string',
        answer: 'any_answer'
      }, {
        answer: 'another_answer'
      }])
    })
  })

  describe('LoadSurveys', () => {
    test('Should load all surveys on success', async () => {
      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [{
            image: 'any_string',
            answer: 'any_answer'
          }],
          date: new Date()
        },
        {
          question: 'other_question',
          answers: [{
            image: 'other_string',
            answer: 'other_answer'
          }],
          date: new Date()
        }
      ])
      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(2)
      expect(surveys[0].question).toBe('any_question')
      expect(surveys[1].question).toBe('other_question')
    })

    test('Should return empty list', async () => {
      const sut = makeSut()
      const surveys = await sut.loadAll()

      expect(surveys.length).toBe(0)
    })
  })
})
