import { sign } from 'jsonwebtoken'
import env from '@/main/config/env'
import { type Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'

const makeAccessToken = async (): Promise<string> => {
  const res = await accountCollection.insertOne({
    name: 'Matheus',
    email: 'matheus.jose@gmail.com',
    role: 'admin'
  })

  const accessToken = sign(res.insertedId.toString(), env.jwtSecret)

  await accountCollection.updateOne({
    _id: res.insertedId
  }, {
    $set: {
      accessToken
    }
  })
  return accessToken
}

let surveyCollection: Collection
let accountCollection: Collection
describe('Surveys Routes', () => {
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
    accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('PUT /surveys/:surveyId/results', () => {
    test('Should return 403 save survey without accessToken', async () => {
      await request(app)
        .put('/api/surveys/any_id/results')
        .send({
          answer: 'any_answer'
        })
        .expect(403)
    })

    test('Should return 200 on save survey result with accessToken', async () => {
      const accessToken = await makeAccessToken()

      const survey = await surveyCollection.insertOne({
        question: 'any_question',
        answers: [{
          image: 'any_string',
          answer: 'any_answer'
        }],
        date: new Date()
      })

      await request(app)
        .put(`/api/surveys/${survey.insertedId.toString()}/results`)
        .send({
          answer: 'any_answer'
        })
        .set('authorization', `Bearer ${accessToken}`)
        .expect(200)
    })
  })
})
