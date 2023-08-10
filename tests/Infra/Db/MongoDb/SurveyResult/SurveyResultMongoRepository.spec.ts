import { SurveyResultMongoRepository } from '@/Infra/Db/MongoDb/SurveyResult/SurveyResultMongoRepository'
import { type Survey } from '@/Domain/Models/Survey'
import { mockAddSurveyParams } from '@/tests/Domain/Mocks/SurveyMock'
import { mockAddUserParams } from '@/tests/Domain/Mocks/UserMock'
import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import { type Collection, ObjectId } from 'mongodb'

let surveyCollection: Collection
let surveyResultCollection: Collection
let userCollection: Collection

const makeSut = (): SurveyResultMongoRepository => {
  return new SurveyResultMongoRepository()
}

const mockSurvey = async (): Promise<Survey> => {
  const res = await surveyCollection.insertOne(mockAddSurveyParams())
  const survey = await surveyCollection.findOne({ _id: res.insertedId })
  return MongoHelper.map(survey)
}

const mockUserId = async (): Promise<string> => {
  const res = await userCollection.insertOne(mockAddUserParams())
  return res.insertedId.toHexString()
}

describe('SurveyMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.deleteMany({})
    surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.deleteMany({})
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('save()', () => {
    test('Should add a survey result if its new', async () => {
      const survey = await mockSurvey()
      const userId = await mockUserId()
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        userId,
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection.findOne({
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId)
      })
      expect(surveyResult).toBeTruthy()
    })

    test('Should update survey result if its not new', async () => {
      const survey = await mockSurvey()
      const userId = await mockUserId()
      await surveyResultCollection.insertOne({
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId),
        answer: survey.answers[0].answer,
        date: new Date()
      })
      const sut = makeSut()
      await sut.save({
        surveyId: survey.id,
        userId,
        answer: survey.answers[1].answer,
        date: new Date()
      })
      const surveyResult = await surveyResultCollection
        .find({
          surveyId: new ObjectId(survey.id),
          userId: new ObjectId(userId)
        })
        .toArray()
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.length).toBe(1)
    })
  })

  describe('loadBySurveyId()', () => {
    test('Should load survey result', async () => {
      const survey = await mockSurvey()
      const userId = await mockUserId()
      const userId2 = await mockUserId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId2),
        answer: survey.answers[0].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, userId)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(100)
      expect(surveyResult.answers[0].isCurrentUserAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(0)
      expect(surveyResult.answers[1].percent).toBe(0)
      expect(surveyResult.answers[1].isCurrentUserAnswer).toBe(false)
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should load survey result 2', async () => {
      const survey = await mockSurvey()
      const userId = await mockUserId()
      const userId2 = await mockUserId()
      const userId3 = await mockUserId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId2),
        answer: survey.answers[1].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId3),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, userId2)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(2)
      expect(surveyResult.answers[0].percent).toBe(67)
      expect(surveyResult.answers[0].isCurrentUserAnswer).toBe(true)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(33)
      expect(surveyResult.answers[1].isCurrentUserAnswer).toBe(false)
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should load survey result 3', async () => {
      const survey = await mockSurvey()
      const userId = await mockUserId()
      const userId2 = await mockUserId()
      const userId3 = await mockUserId()
      await surveyResultCollection.insertMany([{
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId),
        answer: survey.answers[0].answer,
        date: new Date()
      }, {
        surveyId: new ObjectId(survey.id),
        userId: new ObjectId(userId2),
        answer: survey.answers[1].answer,
        date: new Date()
      }])
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, userId3)
      expect(surveyResult).toBeTruthy()
      expect(surveyResult.surveyId).toEqual(survey.id)
      expect(surveyResult.answers[0].count).toBe(1)
      expect(surveyResult.answers[0].percent).toBe(50)
      expect(surveyResult.answers[0].isCurrentUserAnswer).toBe(false)
      expect(surveyResult.answers[1].count).toBe(1)
      expect(surveyResult.answers[1].percent).toBe(50)
      expect(surveyResult.answers[1].isCurrentUserAnswer).toBe(false)
      expect(surveyResult.answers.length).toBe(survey.answers.length)
    })

    test('Should return null if there is no survey result', async () => {
      const survey = await mockSurvey()
      const userId = await mockUserId()
      const sut = makeSut()
      const surveyResult = await sut.loadBySurveyId(survey.id, userId)
      expect(surveyResult).toBeNull()
    })
  })
})
