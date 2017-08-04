import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable';

import { SessionActions } from '../../redux/actions'
import { AppState, Enrollment } from '../../redux/reducers'
import { Customer, Swimmer } from '../../service'

import { totalCourses, totalMemberships, total, enrolledNonMembers } from '../common'
import { toWeekday } from '../../common'

@Component({
	selector: 'checkout-cart',
	templateUrl: './checkout.component.html',
})
export class CheckoutComponent implements OnInit {

	MEMBERSHIP_PRICE: number = 28

	@select() shoppingCart$: Observable<Enrollment[]>
	@select() swimmers$: Observable<Swimmer[]>	
	@select() customer$: Observable<Customer>	

	shoppingCart: Enrollment[]
	swimmers: Swimmer[]
	customer: Customer

	constructor(private actions: SessionActions) {}

	weekday(wd) {
		return toWeekday(wd)
	}

	enrolledNonMembers() {
		return enrolledNonMembers(this.swimmers, this.shoppingCart)
	}

	totalMemberships() {
		return totalMemberships(this.swimmers, this.shoppingCart)
	}

	totalCourses() {
		return totalCourses(this.shoppingCart)
	}

	total() {
		return total(this.swimmers, this.shoppingCart)
	}

	sendEnrollments() {
		this.actions.sendEnrollments(this.shoppingCart, this.customer.account_id)
	}

	ngOnInit() {
		this.shoppingCart$.subscribe(e => this.shoppingCart = e)
		this.swimmers$.subscribe(s => this.swimmers = s)
		this.customer$.subscribe(s => this.customer = s)
	}

}
