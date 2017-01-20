/**
 * Created by Kamil on 2017-01-15.
 */
angular
	.module('app')
	.component('noteList', {
		templateUrl: 'components/noteList/noteList.html',
		controller: ['dataManager', NoteListController]
	});

function NoteListController(dataManger) {
	dataManger.configure('sessionStorageProvider');
	this.notes = [{
		content: 'Magic notes',
		id: 'note_0'
	},{
		content: 'Magic notes',
		id: 'note_0'
	}];
}