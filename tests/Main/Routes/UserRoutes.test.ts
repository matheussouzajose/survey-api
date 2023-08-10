import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import { setupApp } from '@/Main/Config/App'

import { type Collection } from 'mongodb'
import { hash } from 'bcrypt'
import { type Express } from 'express'
import request from 'supertest'

let userCollection: Collection
let app: Express

describe('Login Routes', () => {
  beforeAll(async () => {
    app = await setupApp()
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('POST /signup', () => {
    test('Should return 200 on signup', async () => {
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Matheus',
          email: 'matheus.jose@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(200)
      await request(app)
        .post('/api/signup')
        .send({
          name: 'Matheus',
          email: 'matheus.jose@gmail.com',
          password: '123',
          passwordConfirmation: '123'
        })
        .expect(403)
    })
  })

  describe('POST /signin', () => {
    test('Should return 200 on login', async () => {
      const password = await hash('123', 12)
      await userCollection.insertOne({
        name: 'Matheus',
        email: 'matheus.jose@gmail.com',
        password
      })
      await request(app)
        .post('/api/signin')
        .send({
          email: 'matheus.jose@gmail.com',
          password: '123'
        })
        .expect(200)
    })

    test('Should return 401 on login', async () => {
      await request(app)
        .post('/api/signin')
        .send({
          email: 'matheus.jose@gmail.com',
          password: '123'
        })
        .expect(401)
    })
  })
})
