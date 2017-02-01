/**
 * Created by Kamil on 2017-01-18.
 */
describe('Url detector', function () {
	// given
	beforeEach(module('app'));

	it('should detect url in url address', angular.mock.inject(function (urlDetector) {
		// when, then
		expect(urlDetector.detect('www.magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('http:// www.magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('https:// www.magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('magic.com/maybe/not').length).toBe(1);
		expect(urlDetector.detect('magic.com').length).toBe(1);
	}));

	it('should not detect url in url phrases', angular.mock.inject(function (urlDetector) {
		// when, then
		expect(urlDetector.detect('w:// agro')).toBe(null);
		expect(urlDetector.detect('agro/magre/padre')).toBe(null);
	}));

	it('should detect image url in simple url', angular.mock.inject(function (urlDetector) {
		// given
		var imagePath = 'www.xyz.com/klif.png';
		// when
		var result = urlDetector.detectImagePath(imagePath);
		// then
		expect(result[0]).toEqual(imagePath);
	}));

	it('should detect image url in simple text', angular.mock.inject(function (urlDetector) {
		// given
		var imagePath = 'Awesome image path is in the www.xyz.com/klif.png.';
		// when
		var result = urlDetector.detectImagePath(imagePath);
		// then
		expect(result[0]).toEqual('www.xyz.com/klif.png');
	}));

	it('should detect image url in more complex text', angular.mock.inject(function (urlDetector) {
		// given
		var imagePath = 'Awesome image path is in the www.xyz.com/klif.png. Do you belive it? Its awesome what browser can do now';
		// when
		var result = urlDetector.detectImagePath(imagePath);
		// then
		expect(result[0]).toEqual('www.xyz.com/klif.png');
	}));

	it('should detect more image urls in text', angular.mock.inject(function (urlDetector) {
		// given
		var imagePath = 'Awesome image path is in the www.xyz.com/klif.png. Do you belive it? Its awesome what browser can do now. grs.com/miszcz.gif';
		// when
		var result = urlDetector.detectImagePath(imagePath);
		// then
		expect(result[0]).toEqual('www.xyz.com/klif.png');
		expect(result[1]).toEqual('grs.com/miszcz.gif');
		expect(result.length).toEqual(2);
	}));
});
