import { type AddSurveyRepository } from '@/data/protocols/db/survey/add-survey-repository'
import { type LoadSurveysRepository } from '@/data/protocols/db/survey/load-surveys-repository'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type SurveyModel } from '@/domain/models/survey'
import { type LoadSurveysById } from '@/domain/usecases/survey/load-survey-by-id'
import { MongoHelper } from '@/infra/db/mongodb/helpers/mongo-helper'

export class SurveyMongoRepository implements AddSurveyRepository, LoadSurveysRepository, LoadSurveysById {
  async add (surveyData: AddSurveyParams): Promise<SurveyModel> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const result = await surveyCollection.insertOne(surveyData)
    const survey = await surveyCollection.findOne({ _id: result.insertedId })
    return MongoHelper.map(survey)
  }

  async loadAll (): Promise<SurveyModel[]> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const surveys: any[] = await surveyCollection.find().toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<SurveyModel | null> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: MongoHelper.objectId(id) })
    return survey && MongoHelper.map(survey)
  }
}
