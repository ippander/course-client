import { Injectable, Inject } from '@angular/core';
import { Course } from './course';
import { AppState } from '../../redux/reducers'
import { NgRedux } from '@angular-redux/store'

import * as Redux from 'redux'

import { Http, Response, Headers } from '@angular/http'
 
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { SessionActions } from '../../redux/actions'

import { select } from '@angular-redux/store'

@Injectable()
export class CourseService {

	private endPoint = 'http://localhost/api/course'
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor (private actions: SessionActions, private store: NgRedux<AppState>) {}

  // getCurrentCourses(): Observable<Course[]> {
    // const url = `${this.endPoint}/current`
    // return this.http.get(url)
    //   .map(this.extractData)
    //   .catch(this.handleError)
  // }

  getCurrentCourses() {
    this.actions.fetchCurrentCourses()
// console.log('getcurrentcourses')
//  console.log(state)
//     return state.courses
  }

  addParticipant(event_id, swimmer_id) {

  }

  removeParticipant(event_id, swimmer_id) {

  }

private extractData(res: Response) {
    let body = res.json();
console.log(body)
    return body || { };
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
