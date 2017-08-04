import { Component, OnInit } from '@angular/core';
import { Customer, CustomerService } from '../../service'

import { select, NgRedux } from '@angular-redux/store';
import { AppState } from '../../redux/reducers'
import { SessionActions } from '../../redux/actions'
import { Observable } from 'rxjs/Observable'

@Component({
	selector: 'customer-detail',
	templateUrl: './customer-detail.component.html',
	styleUrls: ['./customer-detail.component.css']
})
export class CustomerDetailComponent implements OnInit {

	@select() customer$: Observable<Customer>
	customer: Customer

	constructor(private actions: SessionActions) {
	}

	ngOnInit() {
		this.customer$.subscribe(c => this.customer = c)
	}

	save() {
		this.actions.updateCustomer(this.customer)
	}
}
