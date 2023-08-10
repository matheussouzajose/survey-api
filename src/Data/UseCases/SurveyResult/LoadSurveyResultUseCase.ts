import { type LoadSurveyResult, type LoadSurveyResultProtocol } from '@/Domain/UseCases/SurveyResult/LoadSurveyResultProtocol'
import {
  type LoadSurveyResultRepositoryProtocol
} from '@/Data/Protocols/Repository/SurveyResult/LoadSurveyResultRepositoryProtocol'
import { type LoadSurveyByIdRepositoryProtocol } from '@/Data/Protocols/Repository/Survey/LoadSurveyByIdRepositoryProtocol'
import { type Survey } from '@/Domain/Models/Survey'
import { type SurveyResult } from '@/Domain/Models/SurveyResult'

export class LoadSurveyResultUseCase implements LoadSurveyResultProtocol {
  constructor (
    private readonly loadSurveyResultRepository: LoadSurveyResultRepositoryProtocol,
    private readonly loadSurveyByIdRepository: LoadSurveyByIdRepositoryProtocol
  ) {}

  async load (surveyId: string, userId: string): Promise<LoadSurveyResult.Result> {
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId, userId)
    if (!surveyResult) {
      const survey = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = this.makeEmptyResult(survey)
    }
    return surveyResult
  }

  private makeEmptyResult (survey: Survey): SurveyResult {
    return {
      surveyId: survey.id,
      question: survey.question,
      date: survey.date,
      answers: survey.answers.map(answer => ({
        ...answer,
        count: 0,
        percent: 0,
        isCurrentUserAnswer: false
      }))
    }
  }
}
