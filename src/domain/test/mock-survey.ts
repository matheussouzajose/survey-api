import { type SurveyModel } from '@/domain/models/survey'
import { type AddSurveyParams } from '@/domain/usecases/survey/add-survey'

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
