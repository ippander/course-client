import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable';

import { SessionActions } from '../redux/actions'
import { AppState, Enrollment } from '../redux/reducers'
import { Customer, Swimmer } from '../service'

// import { totalCourses, totalMemberships, total, enrolledNonMembers } from '../common'
import { toWeekday } from '../common'

@Component({
	selector: 'checkout-cart',
	templateUrl: './view-enrollments.component.html',
})
export class ViewEnrollmentsComponent implements OnInit {

	@select() customer$: Observable<Customer>
	@select() enrollments$: Observable<Enrollment[]>
	enrollments: Enrollment[]
	customer: Customer

	constructor(private actions: SessionActions) {}

	weekday(wd) {
		return toWeekday(wd)
	}

	ngOnInit() {
		this.enrollments$.subscribe(e => this.enrollments = e)
		this.customer$.subscribe(c => this.customer = c)
		this.actions.fetchEnrollments(this.customer.account_id)
	}
}