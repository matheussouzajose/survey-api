import {
  type SaveSurveyResultRepository,
  type SaveSurveyResultRepositoryProtocol
} from '@/Data/Protocols/Repository/SurveyResult/SaveSurveyResultRepositoryProtocol'
import {
  type LoadSurveyResultRepository,
  type LoadSurveyResultRepositoryProtocol
} from '@/Data/Protocols/Repository/SurveyResult/LoadSurveyResultRepositoryProtocol'
import { MongoHelper } from '@/Infra/Db/MongoDb/Helpers/MongoHelper'
import { QueryBuilder } from '@/Infra/Db/MongoDb/Helpers/QueryBuilder'
import { type SurveyResult } from '@/Domain/Models/SurveyResult'
import round from 'mongo-round'

export class SurveyResultMongoRepository implements SaveSurveyResultRepositoryProtocol,
  LoadSurveyResultRepositoryProtocol {
  async save (data: SaveSurveyResultRepository.Params): Promise<void> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    await surveyResultCollection.findOneAndUpdate({
      surveyId: MongoHelper.objectId(data.surveyId),
      userId: MongoHelper.objectId(data.userId)
    }, {
      $set: {
        answer: data.answer,
        date: data.date
      }
    }, {
      upsert: true
    })
  }

  async loadBySurveyId (surveyId: string, userId: string): Promise<LoadSurveyResultRepository.Result> {
    const surveyResultCollection = await MongoHelper.getCollection('surveyResults')
    const query = new QueryBuilder()
      .match({
        surveyId: MongoHelper.objectId(surveyId)
      })
      .group({
        _id: 0,
        data: {
          $push: '$$ROOT'
        },
        total: {
          $sum: 1
        }
      })
      .unwind({
        path: '$data'
      })
      .lookup({
        from: 'surveys',
        foreignField: '_id',
        localField: 'data.surveyId',
        as: 'survey'
      })
      .unwind({
        path: '$survey'
      })
      .group({
        _id: {
          surveyId: '$survey._id',
          question: '$survey.question',
          date: '$survey.date',
          total: '$total',
          answer: '$data.answer',
          answers: '$survey.answers'
        },
        count: {
          $sum: 1
        },
        currentUserAnswer: {
          $push: {
            $cond: [{ $eq: ['$data.userId', MongoHelper.objectId(userId)] }, '$data.answer', '$invalid']
          }
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $map: {
            input: '$_id.answers',
            as: 'item',
            in: {
              $mergeObjects: ['$$item', {
                count: {
                  $cond: {
                    if: {
                      $eq: ['$$item.answer', '$_id.answer']
                    },
                    then: '$count',
                    else: 0
                  }
                },
                percent: {
                  $cond: {
                    if: {
                      $eq: ['$$item.answer', '$_id.answer']
                    },
                    then: {
                      $multiply: [{
                        $divide: ['$count', '$_id.total']
                      }, 100]
                    },
                    else: 0
                  }
                },
                isCurrentUserAnswerCount: {
                  $cond: [{
                    $eq: ['$$item.answer', {
                      $arrayElemAt: ['$currentUserAnswer', 0]
                    }]
                  }, 1, 0]
                }
              }]
            }
          }
        }
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answers'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answers: {
          $reduce: {
            input: '$answers',
            initialValue: [],
            in: {
              $concatArrays: ['$$value', '$$this']
            }
          }
        }
      })
      .unwind({
        path: '$answers'
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date',
          answer: '$answers.answer',
          image: '$answers.image'
        },
        count: {
          $sum: '$answers.count'
        },
        percent: {
          $sum: '$answers.percent'
        },
        isCurrentUserAnswerCount: {
          $sum: '$answers.isCurrentUserAnswerCount'
        }
      })
      .project({
        _id: 0,
        surveyId: '$_id.surveyId',
        question: '$_id.question',
        date: '$_id.date',
        answer: {
          answer: '$_id.answer',
          image: '$_id.image',
          count: round('$count'),
          percent: round('$percent'),
          isCurrentUserAnswer: {
            $eq: ['$isCurrentUserAnswerCount', 1]
          }
        }
      })
      .sort({
        'answer.count': -1
      })
      .group({
        _id: {
          surveyId: '$surveyId',
          question: '$question',
          date: '$date'
        },
        answers: {
          $push: '$answer'
        }
      })
      .project({
        _id: 0,
        surveyId: {
          $toString: '$_id.surveyId'
        },
        question: '$_id.question',
        date: '$_id.date',
        answers: '$answers'
      })
      .build()
    const surveyResult = await surveyResultCollection.aggregate<SurveyResult>(query).toArray()
    return surveyResult.length ? surveyResult[0] : null
  }
}
