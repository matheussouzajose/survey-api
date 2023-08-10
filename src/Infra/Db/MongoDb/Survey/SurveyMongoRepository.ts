import {
  type AddSurveyRepository,
  type AddSurveyRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/AddSurveyRepositoryProtocol'
import {
  type LoadSurveysRepository,
  type LoadSurveysRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/LoadSurveysRepositoryProtocol'
import {
  type LoadSurveyByIdRepository,
  type LoadSurveyByIdRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/LoadSurveyByIdRepositoryProtocol'
import {
  type CheckSurveyByIdRepository,
  type CheckSurveyByIdRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/CheckSurveyByIdRepositoryProtocol'
import {
  type LoadAnswersBySurveyRepository,
  type LoadAnswersBySurveyRepositoryProtocol
} from '@/Data/Protocols/Repository/Survey/LoadAnswersBySurveyRepositoryProtocol'
import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import { QueryBuilder } from '@/Infra/Db/MongoDb/Helpers/QueryBuilder'

export class SurveyMongoRepository implements AddSurveyRepositoryProtocol,
  LoadSurveysRepositoryProtocol,
  LoadSurveyByIdRepositoryProtocol,
  CheckSurveyByIdRepositoryProtocol,
  LoadAnswersBySurveyRepositoryProtocol {
  async add (data: AddSurveyRepository.Params): Promise<void> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    await surveyCollection.insertOne(data)
  }

  async loadAll (userId: string): Promise<LoadSurveysRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .lookup({
        from: 'surveyResults',
        foreignField: 'surveyId',
        localField: '_id',
        as: 'result'
      })
      .project({
        _id: 1,
        question: 1,
        answers: 1,
        date: 1,
        didAnswer: {
          $gte: [{
            $size: {
              $filter: {
                input: '$result',
                as: 'item',
                cond: {
                  $eq: ['$$item.userId', MongoHelper.objectId(userId)]
                }
              }
            }
          }, 1]
        }
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return MongoHelper.mapCollection(surveys)
  }

  async loadById (id: string): Promise<LoadSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({ _id: MongoHelper.objectId(id) })
    return survey && MongoHelper.map(survey)
  }

  async loadAnswers (id: string): Promise<LoadAnswersBySurveyRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const query = new QueryBuilder()
      .match({
        _id: MongoHelper.objectId(id)
      })
      .project({
        _id: 0,
        answers: '$answers.answer'
      })
      .build()
    const surveys = await surveyCollection.aggregate(query).toArray()
    return surveys[0]?.answers || []
  }

  async checkById (id: string): Promise<CheckSurveyByIdRepository.Result> {
    const surveyCollection = await MongoHelper.getCollection('surveys')
    const survey = await surveyCollection.findOne({
      _id: MongoHelper.objectId(id)
    }, {
      projection: {
        _id: 1
      }
    })
    return survey !== null
  }
}
