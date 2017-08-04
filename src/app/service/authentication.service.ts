import { Injectable } from '@angular/core';
import { SessionActions } from '../redux/actions'

import { Router, ActivatedRoute } from '@angular/router';

@Injectable()
export class AuthenticationService {

	constructor(private session: SessionActions, private router: Router) {}

	login(user, password): any {
		this.session.login(user, password)
		// this.router.navigate(['/'])
	}

	logout() {

	}

}