import { MongoHelper } from '../helpers/mongo-helper'
import { type AddSurveyRepository } from '../../../../data/protocols/db/survey/add-survey-repository'
import { type AddSurveyModel } from '../../../../domain/usecases/add-survey'
import { type SurveyModel } from '../../../../domain/models/survey-model'

export class SurveyMongoRepository implements AddSurveyRepository {
  async add (surveyData: AddSurveyModel): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(surveyData)
    const account = await surveyCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(account)
  }
}
