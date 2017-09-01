
import { Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../service'

import { select, NgRedux } from '@angular-redux/store';
import { AppState } from '../redux/reducers'
import { SessionActions } from '../redux/actions'
import { Observable } from 'rxjs/Observable'

@Component({
	selector: 'navigation-component',
	templateUrl: './navigation.component.html',
	styles: [
	'.navbar { background-color: #fff }',
	'.shopping-cart-right { padding-right: 20px; position: relative; z-index: 10; }',
	'.nav-link { font-weight: bold; color: #0275d8 !important; }'
	]
})
export class NavigationComponent implements OnInit {

	isCollapsed = true

	toggleState() {
		this.isCollapsed = !this.isCollapsed
	}

	@select(state => state.session.customer) customer$: Observable<Customer>
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
