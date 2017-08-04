import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { RouterModule, Routes } from '@angular/router';

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

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbdDatepickerI18n } from '../datepicker-i18n'

import { NgReduxModule, NgRedux, DevToolsExtension } from '@angular-redux/store';

import { AppState, INITIAL_STATE, sessionReducer } from './redux/reducers'
import { SessionActions } from './redux/actions'
import { createLogger } from 'redux-logger'

// import { appStoreProviders, createAppStore } from './redux/reducers';


@NgModule({
  declarations: [
    AppComponent,
    NgbdDatepickerI18n,
    CustomerDetailComponent,
    SwimmerDetailComponent,
    SwimmerListComponent,
    CourseListComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    LoginComponent,
    NavigationComponent,
    CreateAccountComponent,
    ViewEnrollmentsComponent
  ],
  imports: [
    NgbModule.forRoot(),
    // NgbCollapse,
    BrowserModule,
    FormsModule,
    HttpModule,
    NgReduxModule,
    RouterModule.forRoot([
      { path: 'login', component: LoginComponent },
      { path: 'create-account', component: CreateAccountComponent },
      { path: 'customer', component: CustomerDetailComponent },
      { path: 'swimmer-list', component: SwimmerListComponent },
      { path: 'swimmer-detail', component: SwimmerDetailComponent },
      { path: 'courses', component: CourseListComponent },      
      { path: 'checkout-cart', component: CheckoutComponent },
      { path: 'view-enrollments', component: ViewEnrollmentsComponent }
    ],
    { enableTracing: true }
    )
  ],
  // providers: [ appStoreProviders ],
  providers: [ SessionActions ],
  bootstrap: [AppComponent]
})

export class AppModule {
  constructor(ngRedux: NgRedux<AppState>, devTools: DevToolsExtension) {

    const storeEnhancers = devTools.isEnabled() ? // <- New
      [ devTools.enhancer() ] : // <- New
      []; // <- New

    ngRedux.configureStore(sessionReducer, INITIAL_STATE, [createLogger()], storeEnhancers);
  }
}
