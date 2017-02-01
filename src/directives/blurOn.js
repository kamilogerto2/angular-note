/**
 * Created by Kamil on 2017-02-01.
 */
angular.module("app").directive("blurOn", function($timeout) {
	return {
		restrict: "A",
		link: function(scope, element, attrs) {
			scope.$on(attrs.blurOn, function(e) {
				console.log('event rigeered');
				$timeout((function() {
					element[0].blur();
				}), 10);
			});
		}
	};
});