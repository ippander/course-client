
export class Swimmer {
	id: number
	account_id: number
	first_name: string
	last_name: string
	birthday: string
	isMember: boolean
	notes: string

	constructor(values: Object = {}) {
		Object.assign(this, values)
	}
}

export class Customer {

	id:			number
	account_id:	number;
	email: string
	first_name:	string
	last_name:	string
	birthday:	string
	street_address: string
	zipcode:	string
	post_office:	string
	notes:		string
	swimmers:	Swimmer[]
	
	constructor(values: Object = {}) {
		let swimmers = values['swimmers'].map(s => new Swimmer(s))
		values['swimmers'] = swimmers
		Object.assign(this, values);
	}
}
