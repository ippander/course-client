import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable'
import { Customer } from '../../service'

import { SessionActions } from '../../redux/actions'
 
@Component({
    selector: 'create-account',
    templateUrl: './create-account.component.html'
})
export class CreateAccountComponent implements OnInit {

    @select(state => state.session.customer) customer$: Observable<Customer>
    customer: Customer

    constructor(private actions: SessionActions) {
    }

    ngOnInit() {
        this.customer$.subscribe(c => this.customer = c)
    }

    save() {
        this.customer.notes = ''
        this.actions.register(this.customer)
    }
}
