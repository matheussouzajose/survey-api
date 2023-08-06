import { type SaveSurveyResultRepository } from '@/data/protocols/db/survey-result/save-survey-result-repository'
import { type SaveSurveyResultParams } from '@/domain/usecases/survey-result/save-survey-result'
import { type SurveyResultModel } from '@/domain/models/survey-result'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class SurveyResultMongoRepository implements SaveSurveyResultRepository {
  async save (data: SaveSurveyResultParams): Promise<SurveyResultModel> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const result = await surveyResultCollection.findOneAndUpdate({
      surveyId: MongoHelper.objectId(data.surveyId),
      accountId: MongoHelper.objectId(data.accountId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true
    })

    const id = result.lastErrorObject?.upserted || result.value?._id
    const surveyResult = await surveyResultCollection.findOne({ _id: id })
    return surveyResult && MongoHelper.map(surveyResult)
  }
}
