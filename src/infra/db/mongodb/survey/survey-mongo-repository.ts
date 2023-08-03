import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'
import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type AddSurveyModel } from '@/domain/usecases/add-survey'
import { type Survey } from '@/domain/models/survey'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository {
  async add (surveyData: AddSurveyModel): Promise<Survey> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(surveyData)
    const survey = await surveyCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(survey)
  }

  async loadAll (): Promise<Survey[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: any[] = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }
}
