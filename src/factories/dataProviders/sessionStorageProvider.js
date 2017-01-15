/**
 * Created by Kamil on 2017-01-15.
 */
angular.module('app').factory('sessionStorageProvider', function () {
	var keyTableID = 'noteKeys';

	function getKeysTable() {
		return sessionStorage.getItem(keyTableID);
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
		/**
		 *
		 * @param value - value which will be insterted to localStorage
		 * @returns new key for note
		 */
		set: function (value) {
			var key = getNextKey();
			sessionStorage.setItem(key, value);
			return key;
		},
		/**
		 *
		 * @param key - key which determine value to get from localStorage
		 * @returns expected value
		 */
		get: function (key) {
			return sessionStorage.getItem(key);
		},
		/**
		 * remove element from localStorage
		 * @param key
		 */
		remove: function (key) {
			var keysTable = getKeysTable(), keyIndex;
			sessionStorage.removeItem(key);
			keyIndex = keysTable.indexOf(key);
			if (keyIndex > -1) {
				keysTable.splice(keyIndex, 1);
			}
		},
		/**
		 *
		 * @param key - key for note in localStorage
		 * @param value - new value for note
		 */
		edit: function (key, value) {
			sessionStorage.setItem(key, value);
		},
		/**
		 *
		 * @returns {Array} list of all notes
		 */
		getList: function () {
			var keysTable = getKeysTable(), noteTable = [], actualNote;
			for (var keyID = 0; keyID < keysTable.length; i++) {
				actualNote = sessionStorage.getItem(keysTable[keyID]);
				noteTable.push(actualNote);
			}

			return noteTable;
		},
		/**
		 * clear all data
		 */
		clear: function () {
			//if we know that we want to delete all data in sessionStorage
			//in other case we should delete only notes and clear keyTable
			sessionStorage.clear();
		}
	}
});