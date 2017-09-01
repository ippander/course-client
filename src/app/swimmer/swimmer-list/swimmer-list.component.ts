import { Component, OnInit } from '@angular/core';
import { Customer, Swimmer } from '../../service'
import { AppState } from '../../redux/reducers'
import { select, NgRedux } from '@angular-redux/store';
import { Observable } from 'rxjs/Observable'

@Component({
  selector: 'swimmer-list',
  templateUrl: './swimmer-list.component.html'
})
export class SwimmerListComponent implements OnInit {

	@select(state => state.session.swimmers) swimmers: Observable<Swimmer[]>
  @select(state => state.session.customer) customer: Observable<Customer>
  account_id: number

  constructor(private store: NgRedux<AppState>) {
  }

  ngOnInit() {
    this.customer.subscribe(c => this.account_id = c.account_id)
  }

  // getCurrentSwimmers() {
  // 	this.swimmers = this.customerService.getCurrentCustomer().swimmers
  // }

}
