/**
 * Created by Kamil on 2017-01-29.
 */
angular.module("app").directive("focusOn", function ($timeout) {
	return {
		restrict: "A",
		link: function (scope, element, attrs) {
			scope.$on(attrs.focusOn, function () {
				$timeout((function () {
					element[0].focus();
				}), 10);
			});
		}
	};
});
