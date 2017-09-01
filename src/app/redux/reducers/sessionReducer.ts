import { Customer, Swimmer, Course, CourseEvent } from '../../service'
import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import {
  Actions,
  ActionTypes,
  LoginAction,
  PayloadAction
} from '../actions';

import { InjectionToken } from '@angular/core'

export interface Enrollment {
  swimmer: Swimmer
  course: Course
  event: CourseEvent
}

export interface SessionState {
  customer: Customer,
  swimmers: Swimmer[],
}

export const INITIAL_SESSION_STATE: SessionState = {
  customer: {} as Customer,
  swimmers: [] as Swimmer[],
}

export const sessionReducer = (state = INITIAL_SESSION_STATE, action: Actions): SessionState => {

  switch(action.type) {

    case ActionTypes.LOGIN:
    	return {
        ...state,
    		customer: action.payload as Customer,
        swimmers: action.payload['swimmers'] as Swimmer[]
    	}

    case ActionTypes.LOGOUT:
      return {
        ...INITIAL_SESSION_STATE
      }

    case ActionTypes.REGISTER:

      let customer = action.payload as Customer
      let swimmer = new Swimmer(customer)

      return {
        ...state,
        customer: customer,
        swimmers: [ swimmer ]
      }

  }

  return state
}
