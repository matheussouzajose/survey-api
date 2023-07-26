import request from 'supertest'
import app from '../config/app'
import { MongoHelper } from '../../infra/db/mongodb/helpers/mongo-helper'

describe('Login Routes', () => {
  beforeAll(async () => {
    const uri = process.env.MONGO_URL ?? 'mongodb://localhost:27017/clean-node-api'
    await MongoHelper.connect(uri)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return an account on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Matheus',
          email: 'matheus.jose@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(201)
    })
  })

  describe('POST /login', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Matheus',
          email: 'matheus.jose@gmail.com',
          password: '123456',
          passwordConfirmation: '123456'
        })
        .expect(201)
    })
  })
})
