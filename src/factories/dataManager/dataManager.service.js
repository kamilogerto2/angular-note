/**
 * Created by Kamil on 2017-01-15.
 */
angular.module('app').factory('dataManager', function () {
	var dataProvider, $injector = angular.injector();
	function checkProvider() {
		if(!dataProvider) {
			throw 'data provider is not initialized';
		}
	}

	return {
		setNote: function (key, value) {
			checkProvider();
			try {
				dataProvider.set(key, value);
				return true;
			} catch(e) {
				return false;
			}
		},
		getNote: function (key) {
			checkProvider();
			try {
				dataProvider.get(key, value);
				return true;
			} catch(e) {
				return false;
			}
		},
		getListNode: function () {
			checkProvider();
			try {
				dataProvider.getList(key, value);
				return true;
			} catch(e) {
				return false;
			}
		},
		cleanNoteStorage: function () {
			checkProvider();
			try {
				dataProvider.clean(key, value);
				return true;
			} catch(e) {
				return false;
			}
		},
		configure: function (provider) {
			try {
				dataProvider = $injector.get(provider);
				return true;
			} catch(e) {
				return false;
			}
		}
	};
});