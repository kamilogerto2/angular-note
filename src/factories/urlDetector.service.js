/**
 * Created by Kamil on 2017-01-18.
 */
angular.module('app').service('urlDetector', function () {
	function determineImageInURL(path) {
		var imageExpression = /(\/*\.(?:png|jpg)[^a-zA-Z])/gi;
		var regex = new RegExp(imageExpression);
		return path.match(regex).length ? true : false;
	}
	this.detect = function (text) {
		var urlExpression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
		var regex = new RegExp(urlExpression);
		return text.match(regex);
	};

	this.detectImagePath = function (text) {
		var urlInText = this.detect(text), imageTable = [];
		for (var i = 0; i < urlInText.length; i++) {
			if (determineImageInURL(urlInText[i])) {
				imageTable.push(urlInText[i]);
			}
		}

		return imageTable;
	}
});