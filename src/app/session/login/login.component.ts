import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
 
import { SessionActions } from '../../redux/actions'
 
@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})
 
export class LoginComponent implements OnInit {

    model: any = {}
    loading = false
    returnUrl: string
 
    constructor(private actions: SessionActions) { }
 
    ngOnInit() {
        // reset login status
        // this.authenticationService.logout();
 
        // get return url from route parameters or default to '/'
        // this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }
 
    login() {

        this.actions.login(this.model.username, this.model.password)
        // this.authenticationService.login(
        //     this.model.username, this.model.password
        // )
        // this.loading = true;
        // this.authenticationService.login(this.model.username, this.model.password)
        //     .subscribe(
        //         data => {
        //             this.router.navigate([this.returnUrl]);
        //         },
        //         error => {
        //             this.alertService.error(error);
        //             this.loading = false;
        //         });
    }
}
