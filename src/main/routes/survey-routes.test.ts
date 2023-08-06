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

  describe('GET /surveys', () => {
    test('Should return 403 an add survey without accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .send({
          question: 'Question 1',
          answers: [{
            image: 'https://image.com.br',
            answer: 'any_answer'
          }, {
            answer: 'any_answer'
          }]
        })
        .expect(403)
    })

    test('Should return 201 an add survey with accessToken', async () => {
      const accessToken = await makeAccessToken()
      await request(app)
        .post('/api/surveys')
        .set('authorization', `Bearer ${accessToken}`)
        .send({
          question: 'Question 1',
          answers: [{
            image: 'https://image.com.br',
            answer: 'any_answer'
          }, {
            answer: 'any_answer'
          }]
        })
        .expect(201)
    })

    test('Should return 500 an add survey with invalid accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .set('authorization', 'Bearer invalid.token')
        .send({
          question: 'Question 1',
          answers: [{
            image: 'https://image.com.br',
            answer: 'any_answer'
          }, {
            answer: 'any_answer'
          }]
        })
        .expect(500)
    })
  })

  describe('POST /surveys', () => {
    test('Should return 403 an add survey without accessToken', async () => {
      await request(app)
        .get('/api/surveys')
        .expect(403)
    })

    test('Should return 200 an load surveys with accessToken', async () => {
      const accessToken = await makeAccessToken()

      await surveyCollection.insertMany([
        {
          question: 'any_question',
          answers: [{
            image: 'any_string',
            answer: 'any_answer'
          }],
          date: new Date()
        }
      ])

      await request(app)
        .get('/api/surveys')
        .set('authorization', `Bearer ${accessToken}`)
        .expect(200)
    })

    test('Should return 500 load surveys with invalid accessToken', async () => {
      await request(app)
        .post('/api/surveys')
        .set('authorization', 'Bearer invalid.token')
        .expect(500)
    })
  })
})
