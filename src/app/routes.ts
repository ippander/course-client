import { Injectable, ModuleWithProviders } from '@angular/core';
import { RouterModule, Routes, CanActivate } from '@angular/router';
import { Observable } from 'rxjs';

import { AppComponent } from './app.component';
import { CustomerDetailComponent } from './customer/customer-detail/customer-detail.component';
import { SwimmerDetailComponent } from './swimmer/swimmer-detail/swimmer-detail.component';
import { SwimmerListComponent } from './swimmer/swimmer-list/swimmer-list.component';
import { CourseListComponent } from './course/course-list/course-list.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart-minimized/shopping-minimized.component';
import { CheckoutComponent } from './shopping-cart/shopping-cart-page/checkout.component';
import { LoginComponent } from './session/login/login.component'
import { NavigationComponent } from './navigation/navigation.component'
import { CreateAccountComponent } from './session/create-account/create-account.component'
import { ViewEnrollmentsComponent } from './enrollment/view-enrollments.component'

@Injectable()
export class AuthGuard implements CanActivate {

  canActivate() {
    console.log('wut')
    return confirm("Activate?")
  }
}

const routes: Routes = [
      { path: '', redirectTo: '/login', pathMatch: 'full'},
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'customer', component: CustomerDetailComponent, canActivate: [ AuthGuard ] },
      { path: 'swimmer-list', component: SwimmerListComponent },
      { path: 'swimmer-detail', component: SwimmerDetailComponent },
      { path: 'courses', component: CourseListComponent },      
      { path: 'checkout-cart', component: CheckoutComponent },
      { path: 'view-enrollments', component: ViewEnrollmentsComponent }

  // {
  //   path: '',
  //   redirectTo: '/first',
  //   pathMatch: 'full'
  // },
  // {
  //   path: 'first',
  //   component: FirstComponent
  // },
  // {
  //   path: 'second',
  //   component: SecondComponent
  // },
  // {
  //   path: 'third',
  //   component: ThirdComponent,
  //   canActivate: [AuthGuard]
  // }
]

export const routing = RouterModule.forRoot(routes)