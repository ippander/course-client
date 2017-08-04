// import { Reducer, Store, createStore, StoreEnhancer, compose } from 'redux';
import { Customer, Swimmer, Course, CourseEvent } from '../../service'
import { NgRedux, DevToolsExtension } from '@angular-redux/store';

import {
  // Userdata,
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

export interface AppState {
  customer: Customer,
  swimmers: Swimmer[],
  courses: Course[],
  shoppingCart: Enrollment[]
}

export const INITIAL_STATE: AppState = {
  customer: {} as Customer,
  swimmers: [] as Swimmer[],
  courses: [] as Course[],
  shoppingCart: [] as Enrollment[]
}

export const sessionReducer = (state: AppState, action: Actions): AppState => {

  switch(action.type) {

    case ActionTypes.LOGIN:
    	return {
        ...state,
    		customer: action.payload as Customer,
        swimmers: action.payload['swimmers'] as Swimmer[]
    	}

    case ActionTypes.LOGOUT:
      return {
        ...INITIAL_STATE
      }

    case ActionTypes.RECEIVE_COURSES:
      return {
        ...state,
        courses: action.payload as Course[]
      }

    case ActionTypes.UPDATE_CUSTOMER:
      return {
        ...state,
        customer: action.payload as Customer
      }

    case ActionTypes.REGISTER:

      let customer = action.payload as Customer
      let swimmer = new Swimmer(customer)

      return {
        ...state,
        customer: customer,
        swimmers: [ swimmer ]
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
        enrollments: action.payload as Enrollment[]
      }

    case ActionTypes.RECEIVE_ENROLLMENTS:
      return {
        ...state,
        enrollments: action.payload as Enrollment[]
      }

  }

  return state
}
