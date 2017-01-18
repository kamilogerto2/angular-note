/**
 * Created by Kamil on 2017-01-18.
 */
describe('Url detector', function () {
	//given
	beforeEach(module('app'));

	it('should detect url in url address', angular.mock.inject(function (urlDetector) {
		expect(urlDetector.detect('www.magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('http://www.magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('https://www.magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('magic.com').length).toBe(1);
	}));

	it('should not detect url in url phrases', angular.mock.inject(function (urlDetector) {
		expect(urlDetector.detect('www.magic')).toBe(null);
		expect(urlDetector.detect('w://agro')).toBe(null);
		expect(urlDetector.detect('agro.magre')).toBe(null);
		expect(urlDetector.detect('agro/magre/padre')).toBe(null);
	}));

	it('should detect url in simple text', angular.mock.inject(function (urlDetector) {

	}));

	it('should detect url in more complex text', angular.mock.inject(function (urlDetector) {

	}));

	it('should detect more url address in complex text', angular.mock.inject(function (urlDetector) {

	}));

});