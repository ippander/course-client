import { Component, OnInit } from '@angular/core';
import { select, NgRedux } from '@angular-redux/store'
import { Observable } from 'rxjs/Observable';

import { Course, CourseEvent } from '../../course/shared/course'
import { Swimmer } from '../../service'

import { AppState, Enrollment } from '../../redux/reducers'
import { totalCourses, totalMemberships } from '../common'

@Component({
  selector: 'shopping-cart',
  templateUrl: './shopping-minimized.component.html',
})
export class ShoppingCartComponent implements OnInit {

	MEMBERSHIP_PRICE: number = 28

	@select(state => state.courses.shoppingCart) shoppingCart$: Observable<Enrollment[]>
	@select(state => state.courses.courses) courses$: Observable<Course[]>	
	@select(state => state.session.swimmers) swimmers$: Observable<Swimmer[]>	

	private shoppingCart: Enrollment[]
	private courses: Course[]
	private swimmers: Swimmer[]

	getCurrentSum() {
		
		let courseFees = totalCourses(this.shoppingCart)
		let memberShips = totalMemberships(this.swimmers, this.shoppingCart)

		return String((courseFees + memberShips) / 100)
	}

	  ngOnInit() {
		this.shoppingCart$.subscribe(e => this.shoppingCart = e)
	  	this.courses$.subscribe(c => this.courses = c)
	  	this.swimmers$.subscribe(s => this.swimmers = s)
	  }
}
