import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { NgRedux } from '@angular-redux/store'
import { AppState } from '../../redux/reducers'
import { SessionActions } from '../../redux/actions'
 
@Component({
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {

    model: any = {}
    loading = false
    returnUrl: string
 
    constructor(private actions: SessionActions, private store: NgRedux<AppState>) { }
 
    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {
        this.store.dispatch(this.actions.login(this.model.username, this.model.password))
        // this.actions.login(this.model.username, this.model.password)
    }
}
