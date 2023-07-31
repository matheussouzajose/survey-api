import { type AddAccountRepository } from '../../../../data/protocols/db/account/add-account-repository'
import { type AddAccountModel } from '../../../../domain/usecases/add-account'
import { type AccountModel } from '../../../../domain/models/account-model'
import { MongoHelper } from '../helpers/mongo-helper'
import {
  type LoadAccountByEmailRepository,
  LoadAccountByTokenRepository,
  type UpdateAccessTokenRepository
} from '../../../../data/protocols/db/account'

export class AccountMongoRepository implements
  AddAccountRepository,
  LoadAccountByEmailRepository,
  UpdateAccessTokenRepository,
  LoadAccountByTokenRepository
{
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    const account = await accountCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(account)
  }

  async loadByEmail (email: string): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }

  async updateAccessToken (id: string, token: string): Promise<void> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    await accountCollection.updateOne({ _id: MongoHelper.objectId(id) }, {
      $set: {
        accessToken: token
      }
    })
  }

  async loadByToken (token: string, role?: string | undefined): Promise<AccountModel | null> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ accessToken: token, role })
    return account && MongoHelper.map(account)
  }
}
