import { Component, OnInit } from '@angular/core';
import { AuthenticationService, CustomerService } from './service';
import { CourseService } from './course/shared/course.service';
import { SessionActions } from './redux/actions'

import { NgRedux, select, DevToolsExtension } from '@angular-redux/store';
// import { AppState, INITIAL_STATE, sessionReducer } from './redux/reducers';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [
  	// CustomerService,
  	// CourseService,
  	// AuthenticationService,
  	SessionActions
  ]
})
export class AppComponent implements OnInit {

constructor(private actions: SessionActions) {}

  ngOnInit() {
  	// this.actions.fetchCurrentCourses()
  	// this.actions.login('foobar@baz.com', 'asdfasdf')
  }
}
