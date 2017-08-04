import {Customer} from '.';

describe('Customer', () => {

  it('should create an instance', () => {
    expect(new Customer()).toBeTruthy();
  });

  it('should construct as expected', () => {
  	
  	let customer = new Customer({
  			id: 1,
			account_id: 2,
			first_name:	'etunimi',
			last_name:	'sukunimi',
			birthday:	'2000-01-01',
			street_address: 'katuosoite',
			zipcode:	'12345',
			post_office:	'Toimipaikka'
  	});

  	expect(customer).toBeTruthy();
  });
});
