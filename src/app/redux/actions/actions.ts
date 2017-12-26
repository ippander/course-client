import { Injectable, Inject } from '@angular/core';
import { AppState, Enrollment } from '../reducers'
import * as Redux from 'redux';
import { Customer, Course, Swimmer } from '../../service'

import { Http, Response, Headers, RequestOptions } from '@angular/http' 
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { NgRedux } from '@angular-redux/store'

import { Router, ActivatedRoute } from '@angular/router';
import { RSAA } from 'redux-api-middleware'

export interface PayloadAction extends Redux.Action {
  payload: any;
}

export class LoginAction implements PayloadAction {
  public readonly type = ActionTypes.LOGIN;
  routes: any
  constructor(public payload: Customer) {}
}

export class RegisterAction implements PayloadAction {
  public readonly type = ActionTypes.REGISTER
  constructor(public payload: Customer) {}
}

export class ReceiveCoursesAction implements PayloadAction {
  public readonly type = ActionTypes.LOGIN
  constructor(public payload: Course[]) {}
}

export class SetSwimmersAction implements PayloadAction {
  public readonly type = ActionTypes.UPDATE_SWIMMER
  constructor(public payload: Swimmer[]) {}
}

export class EnrollAction implements PayloadAction {
  public readonly type = ActionTypes.ENROLL
  constructor(public payload: Enrollment[]) {}
}

export class CancelEnrollmentAction implements PayloadAction {
  public readonly type = ActionTypes.CANCEL_ENROLLMENT
  constructor(public payload: Enrollment[]) {}
}

export class SendEnrollmentsAction implements PayloadAction {
  public readonly type = ActionTypes.ENROLL
  constructor(public payload: Enrollment[]) {}
}

export const ActionTypes = {
  
  LOGIN: 'LOGIN',
  LOGOUT: 'LOGOUT',
  REGISTER: 'REGISTER',
  RECEIVE_COURSES: 'RECEIVE_COURSES',
  UPDATE_CUSTOMER: 'UPDATE_CUSTOMER',
  UPDATE_SWIMMER: 'UPDATE_SWIMMER',
  CREATE_CUSTOMER: 'CREATE_CUSTOMER',
  CREATE_SWIMMER: 'CREATE_SWIMMER',
  ENROLL: 'ENROLL',
  CANCEL_ENROLLMENT: 'CANCEL_ENROLLMENT',
  SEND_ENROLLMENTS: 'SEND_ENROLLMENTS',
  RECEIVE_ENROLLMENTS: 'RECEIVE_ENROLLMENTS',
  REQUEST: 'REQUEST',
  FAILURE: 'FAILURE'
}

@Injectable()
export class SessionActions {

  private endPoint = 'http://localhost/api'
  // private endPoint = 'http://aurajoenuinti.fi/courses/courses_new/api'
  private headers = new Headers({ 'Content-Type': 'application/json' });

  constructor (private http: Http, private store: NgRedux<AppState>, private router: Router) {}

  login(username = '', password = ''): RSAA {

    let url = `${this.endPoint}/login`

    return dispatch => {
      console.log('asdf')
      dispatch({
        [RSAA]: {
          endpoint: url,
          method: 'POST',
          bailout: () => { return this.store.getState().session.customer.id },
          body: JSON.stringify({ username: username, password: password }),
          types: [
            ActionTypes.REQUEST,
            {
              type: ActionTypes.LOGIN,
              payload: (action, state, res) => {
                return res.json().then(json => {
                  dispatch({ type: "@angular-redux/router::UPDATE_LOCATION", payload: "/swimmer-list" })
                  return json
                })
              },
            },
            ActionTypes.FAILURE
          ]
        }})}
  }

  fetchEnrollments(accountId: number) {

    let url = `${this.endPoint}/enroll/${accountId}`

    return this.http.get(url)
      .map((res: Response) => res.json())
      .map(json => {
        return {
          type: ActionTypes.RECEIVE_ENROLLMENTS,
          payload: json
        }
      })
      .subscribe(action => this.store.dispatch(action))

  }

  sendEnrollments(shoppingCart: Enrollment[], account_id: number) {

    let url = `${this.endPoint}/enroll/${account_id}`

    this.http.post(
      url,
      JSON.stringify(shoppingCart),
      { headers: this.headers })
    .map((res: Response) => res.json())
    .map(json => {

      return {
        type: ActionTypes.SEND_ENROLLMENTS,
        payload: shoppingCart
      }
    })
    .subscribe(action => {
      this.store.dispatch(action)
      window.alert('Kiitos ilmoittaumisestasi.')
      this.router.navigate(['view-enrollments'])
    })

  }

  enroll(enrollment: Enrollment) {
    this.store.dispatch({
      type: ActionTypes.ENROLL,
      payload: this.store.getState().courses.shoppingCart.concat([ enrollment ])
    })
  }

  cancelEnrollment(enrollment: Enrollment) {
    this.store.dispatch({
      type: ActionTypes.CANCEL_ENROLLMENT,
      payload: this.store.getState().courses.shoppingCart.filter(
        e => e.swimmer.id !== enrollment.swimmer.id || e.event.id !== enrollment.event.id
      )
    })
  }

  createSwimmer(swimmer: Swimmer, account_id: number) {

    let url = `${this.endPoint}/person/${account_id}`

    this.http.post(
      url,
      JSON.stringify(swimmer),
      { headers: this.headers })
    .map((res: Response) => res.json())
    .map(json => {

      let sw = new Swimmer(json)

      return {
        type: ActionTypes.CREATE_SWIMMER,
        payload: this.store.getState().session.swimmers.filter(s => s.id !== sw.id).concat(sw)
      }
    })
    .subscribe(action => this.store.dispatch(action))
  }

  updateSwimmer(swimmer: Swimmer, account_id: number) {

    let url = `${this.endPoint}/person/${account_id}/${swimmer.id}`

    this.http.put(
      url,
      JSON.stringify(swimmer),
      { headers: this.headers })
    .map((res: Response) => res.json())
    .map(json => {

      return {
        type: ActionTypes.UPDATE_SWIMMER,
        payload: this.store.getState().session.swimmers.filter(s => s.id !== swimmer.id).concat(swimmer)
      }
    })
    .subscribe(action => this.store.dispatch(action))
  }

  register(customer: Customer) {

    let url = `${this.endPoint}/account`

    this.http.post(
      url,
      JSON.stringify(customer),
      { headers: this.headers })
    .map((res: Response) => res.json())
    .map(json => {
      return {
        type: ActionTypes.REGISTER,
        payload: json
      }
    })
    .subscribe(action => {
      this.store.dispatch(action)
      this.router.navigate(['swimmer-list'])
    })
  }

  updateCustomer(customer: Customer) {

    let url = `${this.endPoint}/account/${customer.account_id}`

    this.http.put(
      url,
      JSON.stringify(customer),
      { headers: this.headers })
    .map((res: Response) => res.json())
    .map(json => {
      return {
        type: ActionTypes.UPDATE_CUSTOMER,
        payload: customer
      }
    })
    .subscribe(action => this.store.dispatch(action))
  }

    // return this.http.post(
    //   url,
    //   JSON.stringify({ username: username, password: password }),
    //   { headers: this.headers }
    //   )
    //   .map((res: Response) => res.json())
    //   .map(json => {
    //     return {
    //       type: ActionTypes.LOGIN,
    //       payload: new Customer(json)
    //     }
    //   })
    //   .subscribe(action => {
    //     this.store.dispatch(action)
    //     this.router.navigate(['courses'])
    //   })

  fetchCurrentCourses() {

    let url = `${this.endPoint}/course/current`

    return this.http.get(url)
    .map((res: Response) => res.json())
    .map(json => {
      return {
        type: ActionTypes.RECEIVE_COURSES,
        payload: json.map(c => new Course(c))
      }
    })
    .subscribe(action => this.store.dispatch(action))
  }  

  logout(): Redux.Action {
    return { type: 'LOGOUT' }
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }

}

export type Actions = LoginAction | ReceiveCoursesAction | SetSwimmersAction
| EnrollAction | CancelEnrollmentAction | RegisterAction | SendEnrollmentsAction