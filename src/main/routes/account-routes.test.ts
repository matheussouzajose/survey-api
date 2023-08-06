import { type Collection } from 'mongodb'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import request from 'supertest'
import app from '@/main/config/app'
import { hash } from 'bcrypt'

let accountCollection: Collection
describe('Access Routes', () => {
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

  describe('POST /signup', () => {
    test('Should return an add-account on signup', async () => {
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

  describe('POST /signin', () => {
    test('Should return 200 on signin', async () => {
      const password = await hash('123456', 12)
      await accountCollection.insertOne({
        name: 'Matheus',
        email: 'matheus.jose@gmail.com',
        password
      })
      await request(app)
        .post('/api/signin')
        .send({
          email: 'matheus.jose@gmail.com',
          password: '123456'
        })
        .expect(200)
    })

    test('Should return 401 on signin', async () => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'matheus.jose@gmail.com',
          password: '123456'
        })
        .expect(401)
    })
  })
})
