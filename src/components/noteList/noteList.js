/**
 * Created by Kamil on 2017-01-15.
 */
angular
	.module('app')
	.component('noteList', {
		templateUrl: 'components/noteList/noteList.html',
		controller: ['dataManager', '$scope', NoteListController]
	});

function NoteListController(dataManger, $scope) {
	var ctrl = this;
	// set provider to session storage
	dataManger.configure('sessionStorageProvider');
	ctrl.notes = dataManger.getNoteList();

	/**
	 * Refresh note list when some note is changed
	 */
	$scope.$on('note changed', function () {
		ctrl.notes = dataManger.getNoteList();
	});
}
