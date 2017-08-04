import { Component, OnInit, Inject, Input } from '@angular/core';
import { Course, CourseEvent } from '../shared/course'

import { select, NgRedux } from '@angular-redux/store'
import { AppState, Enrollment } from '../../redux/reducers'
import { Observable } from 'rxjs/Observable';

import { Swimmer, CustomerService, Customer } from '../../service'

import { SessionActions } from '../../redux/actions'
import { toWeekday } from '../../common'

@Component({
  selector: 'course-list',
  templateUrl: './course-list.component.html',
})
export class CourseListComponent implements OnInit {

  @select() readonly courses: Observable<Course[]>
  @select() readonly swimmers: Observable<Swimmer[]>
  @select() readonly shoppingCart$: Observable<Enrollment[]>
  @select() readonly enrollments$: Observable<Enrollment[]>
  @select() readonly customer$: Observable<Customer>

  shoppingCart: Enrollment[]
  enrollments: Enrollment[]
  customer: Customer

  constructor(private store: NgRedux<AppState>, private actions: SessionActions) {
  }

  full(event: CourseEvent) {
    return parseInt(event.current_participants) >= parseInt(event.max_participants)
  }

  allreadyEnrolled(event_id, swimmer_id) {
    // return false
    return this.enrollments.filter(e => e.event.id === event_id && e.swimmer.id === swimmer_id).length > 0
  }

  weekday(wd) {
    return toWeekday(wd)
  }

  enrolled(eventId, swimmerId) {
      return this.shoppingCart.filter(e => e.swimmer.id === swimmerId && e.event.id === eventId).length > 0
  }

  ngOnInit() {
    this.customer$.subscribe(c => this.customer = c)
    this.shoppingCart$.subscribe(e => this.shoppingCart = e)
    this.enrollments$.subscribe(e => this.enrollments = e)
    this.actions.fetchCurrentCourses()
    this.actions.fetchEnrollments(this.customer.account_id)
  }

  enroll({target}, course: Course, course_event: CourseEvent, swimmer: Swimmer) {

    let enrollment = { course: course, event: course_event, swimmer: swimmer }

    if (target.checked) {
      this.actions.enroll(enrollment)
    } else {
      this.actions.cancelEnrollment(enrollment)
    }
  }
}
