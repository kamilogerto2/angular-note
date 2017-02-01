/**
 * Created by Kamil on 2017-01-15.
 */
describe('Data manager', function () {
	// given
	beforeEach(module('app'));
	afterEach(angular.mock.inject(function (dataManager) {
		dataManager.configure('sessionStorageProvider');
		dataManager.cleanNoteStorage();
	}));

	function configureAndSetNotes(notes, dataManager) {
		dataManager.configure('sessionStorageProvider');
		var resultTable = [];
		for (var id = 0; id < notes.length; id++) {
			resultTable.push({key: dataManager.setNote(notes[id]), value: notes[id]});
		}
		return resultTable;
	}

	it('should initialize data provider', angular.mock.inject(function (dataManager) {
		// when
		var result = dataManager.configure('sessionStorageProvider');
		// then
		expect(result).toBe(true);
	}));

	it('should not initialize data provider because not available', angular.mock.inject(function (dataManager) {
		// when
		var result = dataManager.configure('localStorageProvider');
		// then
		expect(result).toBe(false);
	}));

	it('should pass data to storage', angular.mock.inject(function (dataManager) {
		// when
		var results = configureAndSetNotes(['awesome value'], dataManager);
		// then
		expect(sessionStorage.getItem(results[0].key)).toBe(results[0].value);
	}));

	it('should pass note indexes to keysTable', angular.mock.inject(function (dataManager) {
		// given
		var results = configureAndSetNotes(['awesome value', 'awesome value2', 'awesome value3'], dataManager);
		// when
		var keysTable = dataManager.getKeysTable();
		// then
		expect(keysTable.length).toEqual(3);
		expect(keysTable[2]).toEqual(results[2].key);
	}));

	it('should return value from storage', angular.mock.inject(function (dataManager) {
		// given
		var results = configureAndSetNotes(['awesome value', 'awesome value2'], dataManager);
		// when
		var value = dataManager.getNote(results[1].key);
		// then
		expect(value).toEqual(results[1].value);
	}));

	it('should return list of notes from provider', angular.mock.inject(function (dataManager) {
		// given
		configureAndSetNotes(['awesome value', 'awesome value2'], dataManager);
		// when
		var list = dataManager.getNoteList();
		// then
		expect(list.length).toEqual(2);
		expect(list[0].key).toEqual('note_0');
		expect(list[1].key).toEqual('note_1');
		expect(list[0].value).toEqual('awesome value');
	}));

	it('should edit note in storage', angular.mock.inject(function (dataManager) {
		// given
		var results = configureAndSetNotes(['awesome value'], dataManager);
		// when
		dataManager.editNote(results[0].key, 'new value');
		// then
		expect(dataManager.getNote(results[0].key)).toEqual('new value');
	}));

	it('should remove note in storage', angular.mock.inject(function (dataManager) {
		// given
		var results = configureAndSetNotes(['awesome value'], dataManager);
		// when
		dataManager.removeNote(results[0].key);
		// then
		expect(dataManager.getNote(results[0].key)).toBe(false);
	}));

	it('should clean notes data in storage', angular.mock.inject(function (dataManager) {
		// given
		var results = configureAndSetNotes(['awesome value'], dataManager);
		// when
		dataManager.cleanNoteStorage();
		// then
		expect(dataManager.getNote(results[0].key)).toEqual(false);
	}));

	it('should return an error message when error will occured before provider is not initialized', angular.mock.inject(function (dataManager) {
		// when, then
		expect(function () {
			dataManager.setNote('xyz');
		}).toThrow();
	}));
});
