/**
 * Created by Kamil on 2017-01-18.
 */
angular.module('app').service('urlDetector', function () {
	/**
	 * Check if URL is image path
	 * @param path - path to analyze
	 * @returns {*|boolean} - determine if is the image path
	 */
	function determineImageInURL(path) {
		var imageExpression = /(\/*\.(?:png|jpg|gif|jpeg|JPEG|GIF|JPG|PNG))/g;
		var regex = new RegExp(imageExpression);
		return path.match(regex) || false;
	}

	/**
	 * Detect URLs in text
	 * @param text - text to analyzing
	 * @returns {Array} urls
	 */
	this.detectURL = function (text) {
		var urlExpression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
		var regex = new RegExp(urlExpression);
		return text.match(regex);
	};

	/**
	 * Detect image paths in text.
	 * @param text - text to analyzing
	 * @returns {Array} images paths
	 */
	this.detectImagePath = function (text) {
		var urlInText = this.detectURL(text);
		var imageTable = [];
		var newPath;
		var urlPath;
		var i;
		if (urlInText) {
			for (i = 0; i < urlInText.length; i++) {
				if (urlPath = determineImageInURL(urlInText[i])) {
					newPath = urlInText[i].split(urlPath[0]);
					imageTable.push(newPath[0] + urlPath[0]);
				}
			}
		}

		return imageTable;
	};
});
