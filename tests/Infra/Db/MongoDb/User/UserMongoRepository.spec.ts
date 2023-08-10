import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import { UserMongoRepository } from '@/Infra/Db/MongoDb/User/UserMongoRepository'
import { mockAddUserParams } from '@/tests/Domain/Mocks/UserMock'
import { type Collection } from 'mongodb'
import faker from 'faker'

const makeSut = (): UserMongoRepository => {
  return new UserMongoRepository()
}

let userCollection: Collection

describe('AccountMongoRepository', () => {
  beforeAll(async () => {
    await MongoHelper.connect(process.env.MONGO_URL)
  })

  afterAll(async () => {
    await MongoHelper.disconnect()
  })

  beforeEach(async () => {
    userCollection = await MongoHelper.getCollection('users')
    await userCollection.deleteMany({})
  })

  describe('add()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      const isValid = await sut.add(addUserParams)
      expect(isValid).toBe(true)
    })
  })

  describe('loadByEmail()', () => {
    test('Should return an user on success', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const user = await sut.loadByEmail(addUserParams.email)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
      expect(user.name).toBe(addUserParams.name)
      expect(user.password).toBe(addUserParams.password)
    })

    test('Should return null if loadByEmail fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByEmail(faker.internet.email())
      expect(user).toBeFalsy()
    })
  })

  describe('checkByEmail()', () => {
    test('Should return true if email is valid', async () => {
      const sut = makeSut()
      const addUserParams = mockAddUserParams()
      await userCollection.insertOne(addUserParams)
      const exists = await sut.checkByEmail(addUserParams.email)
      expect(exists).toBe(true)
    })

    test('Should return false if email is not valid', async () => {
      const sut = makeSut()
      const exists = await sut.checkByEmail(faker.internet.email())
      expect(exists).toBe(false)
    })
  })

  describe('updateAccessToken()', () => {
    test('Should update the user accessToken on success', async () => {
      const sut = makeSut()
      const res = await userCollection.insertOne(mockAddUserParams())
      const fakeAccount = await userCollection.findOne({ _id: res.insertedId })
      expect(fakeAccount.accessToken).toBeFalsy()
      const accessToken = faker.datatype.uuid()
      await sut.updateAccessToken(fakeAccount._id.toString(), accessToken)
      const user = await userCollection.findOne({ _id: fakeAccount._id })
      expect(user).toBeTruthy()
      expect(user.accessToken).toBe(accessToken)
    })
  })

  describe('loadByToken()', () => {
    let name = faker.name.findName()
    let email = faker.internet.email()
    let password = faker.internet.password()
    let accessToken = faker.datatype.uuid()

    beforeEach(() => {
      name = faker.name.findName()
      email = faker.internet.email()
      password = faker.internet.password()
      accessToken = faker.datatype.uuid()
    })

    test('Should return an user on loadByToken without role', async () => {
      const sut = makeSut()
      await userCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const user = await sut.loadByToken(accessToken)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
    })

    test('Should return an user on loadByToken with admin role', async () => {
      const sut = makeSut()
      await userCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const user = await sut.loadByToken(accessToken, 'admin')
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
    })

    test('Should return null on loadByToken with invalid role', async () => {
      const sut = makeSut()
      await userCollection.insertOne({
        name,
        email,
        password,
        accessToken
      })
      const user = await sut.loadByToken(accessToken, 'admin')
      expect(user).toBeFalsy()
    })

    test('Should return an user on loadByToken with if user is admin', async () => {
      const sut = makeSut()
      await userCollection.insertOne({
        name,
        email,
        password,
        accessToken,
        role: 'admin'
      })
      const user = await sut.loadByToken(accessToken)
      expect(user).toBeTruthy()
      expect(user.id).toBeTruthy()
    })

    test('Should return null if loadByToken fails', async () => {
      const sut = makeSut()
      const user = await sut.loadByToken(accessToken)
      expect(user).toBeFalsy()
    })
  })
})
