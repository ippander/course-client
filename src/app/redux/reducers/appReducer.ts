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

export interface CourseState {
  customer: Customer,
  swimmers: Swimmer[],
  courses: Course[],
  shoppingCart: Enrollment[],
  enrollments: Enrollment[]
}

export const INITIAL_COURSE_STATE: CourseState = {
  customer: {} as Customer,
  swimmers: [] as Swimmer[],
  courses: [] as Course[],
  shoppingCart: [] as Enrollment[],
  enrollments: [] as Enrollment[],
}

export const appReducer = (state = INITIAL_COURSE_STATE, action: Actions): CourseState => {

  switch(action.type) {

    case ActionTypes.RECEIVE_COURSES:
      return {
        ...state,
        courses: action.payload as Course[]
      }

    case ActionTypes.UPDATE_CUSTOMER:
      let cust = action.payload as Customer
      return {
        ...state,
        customer: cust,
        // Update also the swimmer data for customer
        swimmers: state.swimmers.map(s => s.id === cust.id ? new Swimmer(cust) : s)
      }

     case ActionTypes.UPDATE_SWIMMER:
     case ActionTypes.CREATE_SWIMMER:
       // let swimmer: Swimmer = action.payload as Swimmer

       return {
         ...state,
         swimmers: action.payload as Swimmer[]
       }

    case ActionTypes.ENROLL:
    case ActionTypes.CANCEL_ENROLLMENT:
      return {
        ...state,
        shoppingCart: action.payload as Enrollment[]
      }

    case ActionTypes.SEND_ENROLLMENTS:

      // Every customer is a member nowadays.
      let swimmers = state.swimmers.map(s => s.isMember = true)

      return {
        ...state,
        shoppingCart: [],
        // enrollments: action.payload as Enrollment[]
      }

    case ActionTypes.RECEIVE_ENROLLMENTS:
      return {
        ...state,
        // shoppingCart: action.payload as Enrollment[]
        enrollments: action.payload as Enrollment[]
      }

  }

  return state
}
