import { type SurveyModel } from '@/domain/models/survey'
import { type AddSurvey, type AddSurveyParams } from '@/domain/usecases/survey/add-survey'
import { type LoadSurveys } from '@/domain/usecases/survey/load-surveys'
import { type LoadSurveysById } from '@/domain/usecases/survey/load-survey-by-id'

export const mockSurveyModel = (): SurveyModel => {
  return {
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_string',
      answer: 'any_answer'
    }],
    date: new Date()
  }
}

export const mockSurveysModel = (): SurveyModel[] => {
  return [{
    id: 'any_id',
    question: 'any_question',
    answers: [{
      image: 'any_string',
      answer: 'any_answer'
    }],
    date: new Date()
  },
  {
    id: 'other_id',
    question: 'other_question',
    answers: [{
      image: 'other_string',
      answer: 'other_answer'
    }],
    date: new Date()
  }]
}

export const mockAddSurveyParams = (): AddSurveyParams => {
  return {
    question: 'any_question',
    answers: [{
      image: 'any_string',
      answer: 'any_answer'
    }, {
      image: 'another_string',
      answer: 'another_answer'
    }],
    date: new Date()
  }
}

export const mockAddSurvey = (): AddSurvey => {
  class AddSurveyStub implements AddSurvey {
    async add (survey: AddSurveyParams): Promise<any> {
      return await new Promise(resolve => {
        resolve(mockSurveyModel())
      })
    }
  }

  return new AddSurveyStub()
}

export const mockLoadSurveys = (): LoadSurveys => {
  class LoadSurveysStub implements LoadSurveys {
    async loadAll (): Promise<SurveyModel[]> {
      return mockSurveysModel()
    }
  }

  return new LoadSurveysStub()
}

export const mockLoadSurveyById = (): LoadSurveysById => {
  class LoadSurveysByIdStub implements LoadSurveysById {
    async loadById (id: string): Promise<SurveyModel | null> {
      return await new Promise(resolve => {
        resolve(mockSurveyModel())
      })
    }
  }

  return new LoadSurveysByIdStub()
}
