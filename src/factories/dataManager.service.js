/**
 * Created by Kamil on 2017-01-15.
 */
angular.module('app').service('dataManager', function ($injector) {
	var dataProvider;

	function checkProvider() {
		if (!dataProvider) {
			throw new Error('data provider is not initialized');
		}
	}

	var keyTableID = 'noteKeys';

	function getKeysTable() {
		var rawTable = dataProvider.get(keyTableID);
		if (rawTable) {
			return angular.fromJson(rawTable);
		}
		return false;
	}

	function getNextKey() {
		var keysTable = getKeysTable();
		var lastNoteKey;
		var nextNoteKey;
		if (keysTable) {
			lastNoteKey = keysTable[keysTable.length - 1];
			nextNoteKey = 'note_' + (parseInt(lastNoteKey.split('_')[1], 10) + 1);
		} else {
			nextNoteKey = 'note_' + 0;
		}
		return nextNoteKey;
	}

	function addKeyToKeysTable(key) {
		var keysTable = getKeysTable();
		var processedKeysTable = [];
		if (keysTable) {
			keysTable.push(key);
			dataProvider.set(keyTableID, angular.toJson(keysTable));
		} else {
			processedKeysTable.push(key);
			dataProvider.set(keyTableID, angular.toJson(processedKeysTable));
		}
	}

	function removeItemFromKeysTable(key) {
		var keysTable = getKeysTable();
		var keyIndex = keysTable.indexOf(key);
		if (keyIndex > -1) {
			keysTable.splice(keyIndex, 1);
		}
		dataProvider.set(keyTableID, angular.toJson(keysTable));
	}

	this.setNote = function (value) {
		checkProvider();
		try {
			var key = getNextKey();
			dataProvider.set(key, value);
			addKeyToKeysTable(key);
			return key;
		} catch (e) {
			return false;
		}
	};

	this.getNote = function (key) {
		checkProvider();
		try {
			var value = dataProvider.get(key);
			if (value) {
				return value;
			}
			return false;
		} catch (e) {
			return false;
		}
	};

	this.editNote = function (key, value) {
		checkProvider();
		try {
			dataProvider.set(key, value);
			return true;
		} catch (e) {
			return false;
		}
	};

	this.removeNote = function (key) {
		checkProvider();
		try {
			dataProvider.remove(key);
			removeItemFromKeysTable(key);
			return true;
		} catch (e) {
			return false;
		}
	};

	this.getNoteList = function () {
		checkProvider();
		try {
			var keysTable = getKeysTable();
			var noteTable = [];
			var actualNote;
			for (var keyID = 0; keyID < keysTable.length; keyID++) {
				actualNote = dataProvider.get(keysTable[keyID]);
				noteTable.push({key: keysTable[keyID], value: actualNote});
			}

			return noteTable;
		} catch (e) {
			return false;
		}
	};

	this.getKeysTable = function () {
		return getKeysTable();
	};

	this.cleanNoteStorage = function () {
		checkProvider();
		try {
			dataProvider.clear();
			return true;
		} catch (e) {
			return false;
		}
	};

	this.configure = function (provider) {
		try {
			dataProvider = $injector.get(provider);
			return true;
		} catch (e) {
			return false;
		}
	};
});
