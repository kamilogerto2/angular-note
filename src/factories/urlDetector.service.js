/**
 * Created by Kamil on 2017-01-18.
 */
angular.module('app').service('urlDetector', function () {
	this.detect = function (text) {
		var urlExpression = /(http(s)?:\/\/.)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi;
		var regex = new RegExp(urlExpression);
		return text.match(regex);
	}
});