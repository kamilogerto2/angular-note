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

	var keyTableID = 'noteKeys';

	function getKeysTable() {
		return dataProvider.getItem(keyTableID);
	}

	function getNextKey() {
		var keysTable = getKeysTable(), lastNoteKey, nextNoteKey;
		if (keysTable) {
			lastNoteKey = keysTable[keysTable.length - 1];
			nextNoteKey = parseInt(lastNoteKey.split('_')[1]) + 1;
		} else {
			nextNoteKey = 'note_' + 0;
		}

		return nextNoteKey;
	}

	return {
		setNote: function (value) {
			checkProvider();
			try {
				var key = getNextKey();
				dataProvider.set(key, value);
				return true;
			} catch(e) {
				return false;
			}
		},
		getNote: function (key) {
			checkProvider();
			try {
				dataProvider.get(key);
				return true;
			} catch(e) {
				return false;
			}
		},
		editNote: function (key, value) {
			checkProvider();
			try {
				dataProvider.set(key, value);
				return true;
			} catch(e) {
				return false;
			}
		},
		removeNote: function (key) {
			checkProvider();
			try {
				dataProvider.remove(key);
				return true;
			} catch(e) {
				return false;
			}
		},
		getNoteList: function () {
			checkProvider();
			try {
				var keysTable = getKeysTable(), noteTable = [], actualNote;
				for (var keyID = 0; keyID < keysTable.length; i++) {
					actualNote = dataProvider.getItem(keysTable[keyID]);
					noteTable.push(actualNote);
				}

				return noteTable;
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