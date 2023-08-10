import { type AddUserRepositoryProtocol } from '@/Data/Protocols/Repository/User/AddUserRepositoryProtocol'
import {
  type LoadUserByEmailRepository,
  type LoadUserByEmailRepositoryProtocol
} from '@/Data/Protocols/Repository/User/LoadUserByEmailRepositoryProtocol'
import {
  type UpdateAccessTokenRepositoryProtocol
} from '@/Data/Protocols/Repository/User/UpdateAccessTokenRepositoryProtocol'
import { type LoadUserByTokenRepositoryProtocol } from '@/Data/Protocols/Repository/User/LoadUserByTokenRepositoryProtocol'
import {
  type CheckUserByEmailRepository,
  type CheckUserByEmailRepositoryProtocol
} from '@/Data/Protocols/Repository/User/CheckUserByEmailRepositoryProtocol'
import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import { type AddUser } from '@/Domain/UseCases/User/AddUserProtocol'

export class UserMongoRepository implements AddUserRepositoryProtocol, LoadUserByEmailRepositoryProtocol,
  UpdateAccessTokenRepositoryProtocol, LoadUserByTokenRepositoryProtocol, CheckUserByEmailRepositoryProtocol {
  async add (data: AddUser.Params): Promise<AddUser.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const result = await userCollection.insertOne(data)
    return result.insertedId !== null
  }

  async loadByEmail (email: string): Promise<LoadUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1,
        name: 1,
        password: 1
      }
    })
    return user && MongoHelper.map(user)
  }

  async checkByEmail (email: string): Promise<CheckUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      email
    }, {
      projection: {
        _id: 1
      }
    })
    return user !== null
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const userCollection = await MongoHelper.getCollection('users')

    await userCollection.updateOne({
      _id: MongoHelper.objectId(id)
    }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string): Promise<LoadUserByEmailRepository.Result> {
    const userCollection = await MongoHelper.getCollection('users')
    const user = await userCollection.findOne({
      accessToken: token,
      $or: [{
        role
      }, {
        role: 'admin'
      }]
    }, {
      projection: {
        _id: 1
      }
    })
    return user && MongoHelper.map(user)
  }
}
