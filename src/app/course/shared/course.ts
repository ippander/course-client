export class Course {

	id:		number
	name:	string
	description: string
	events: Event[]

	constructor(values: Object = {}) {
		values['events'] = values['events'].map(e => new CourseEvent(e))
		Object.assign(this, values)
	}
}

export class CourseEvent {

	id: number;
	weekday: number;
	start_time: string;
	end_time: string;
	price: number
	place: string;
	address: string;
	notes: string
	max_participants: string
	current_participants: string

	constructor(values: Object = {}) {
		Object.assign(this, values);
	}
}