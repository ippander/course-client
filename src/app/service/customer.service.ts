import { Injectable, Inject } from '@angular/core';
import { Customer } from '.';

import { Http, Response, Headers } from '@angular/http'
 
import { Observable } from 'rxjs/Observable'
import 'rxjs/add/operator/catch'
import 'rxjs/add/operator/map'

import { AppState } from '../redux/reducers'
import { select, NgRedux } from '@angular-redux/store'
// import * as Redux from 'redux'

@Injectable()
export class CustomerService {

	private endPoint = 'http://localhost/api/account'
	private headers = new Headers({'Content-Type': 'application/json'});

	constructor (private http: Http, private store: NgRedux<AppState>) {
    store.subscribe(() => this.getCurrentCustomer())
  }

  getCurrentCustomer(): Customer {
    
    let appStore = this.store.getState() as AppState

    if (!appStore) {
      console.log('hep')
    }

    return appStore.session.customer
  }

  // getCustomerById(id: number): Observable<Customer> {
  // 	const url = `${this.endPoint}/${id}`
  // 	return this.http.get(url)
	 //  	.map(this.extractData)
	 //  	.catch(this.handleError)
  // }

update(customer: Customer): Observable<Customer> {
  const url = `${this.endPoint}/${customer.id}`;
  return this.http
    .put(url, JSON.stringify(customer), { headers: this.headers })
    .map(this.extractData)
    .catch(this.handleError);
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
