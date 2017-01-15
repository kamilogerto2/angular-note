/**
 * Created by Kamil on 2017-01-15.
 */
describe('Data manager', function () {
	beforeEach(module('app', function (dataManger) {
		this.dataManager = new dataManger;
	}));

	it('should initialize data provider', function () {
		except().toBe(false);
	});

	it('should pass data to provider', function () {
		except().toBe(false);
	});

	it('should return value from provider', function () {
		except().toBe(false);
	});

	it('should return list of notes from provider', function () {
		except().toBe(false);
	});

	it('should edit data in provider', function () {
		except().toBe(false);
	});

	it('should clean notes data in provider', function () {
		except().toBe(false);
	});

	it('should return an error message when error will occured', function () {
		except().toBe(false);
	});

	it('should check if any provider is available an initialized', function () {
		except().toBe(false);
	});

	it('should provider manually', function () {
		except().toBe(false);
	});
});