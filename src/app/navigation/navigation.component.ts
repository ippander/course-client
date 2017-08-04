import { Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../service'

import { select, NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/reducers'
import { SessionActions } from '../redux/actions'
import { Observable } from 'rxjs/Observable'

@Component({
	selector: 'navigation-component',
	templateUrl: './navigation.component.html'
})
export class NavigationComponent implements OnInit {

	@select() customer$: Observable<Customer>
	customer: Customer

	constructor(private actions: SessionActions) {
	}

	loggedIn() {
		return this.customer.id
	}

	ngOnInit() {
		this.customer$.subscribe(c => this.customer = c)
	}
}
