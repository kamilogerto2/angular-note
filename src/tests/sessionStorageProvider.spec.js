/**
 * Created by Kamil on 2017-01-15.
 */
describe('Data manager', function () {
	beforeEach(module('app'));

	beforeEach(function () {
		//given
		this.Notes = [
			{key: 1, value: 'agdjnajsngjeanfs'},
			{key: 2, value: 'safsag ag'},
			{key: 3, value: 'a a'},
			{key: 4, value: 'a436  436 '},
			{key: 5, value: 'asdg gs gdjnajsngjeanfs'},
			{key: 6, value: 'as d 33 '}
		]
	});

	it('should set data to sessionStorage', angular.mock.inject(function (sessionStorageProvider) {
		//when
		sessionStorageProvider.set(this.Notes[0].key, this.Notes[0].value);
		//then
		expect(sessionStorage.getItem(this.Notes[0].key)).toBe(this.Notes[0].value);
	}));

	it('should get data from sessionStorage', angular.mock.inject(function (sessionStorageProvider) {
		//when
		sessionStorage.setItem(this.Notes[0].key, this.Notes[0].value);
		//then
		expect(sessionStorageProvider.get(this.Notes[0].key)).toBe(this.Notes[0].value);
	}));

	it('should edit data in sessionStorage', angular.mock.inject(function (sessionStorageProvider) {
		//when
		sessionStorageProvider.set(this.Notes[0].key, this.Notes[0].value);
		sessionStorageProvider.set(this.Notes[0].key, 'something other');
		//then
		expect(sessionStorageProvider.get(this.Notes[0].key)).toBe('something other');
	}));

	it('should clear data in sessionStorage', angular.mock.inject(function (sessionStorageProvider) {
		//when
		sessionStorageProvider.set(this.Notes[0].key, this.Notes[0].value);
		sessionStorageProvider.clear();
		//then
		expect(sessionStorageProvider.get(this.Notes[0].key)).toBeNull();
	}));

	it('should throw exception that sessionStorage is full', function () {
		//todo
	})
});