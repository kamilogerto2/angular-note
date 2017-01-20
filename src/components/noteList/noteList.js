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
	dataManger.configure('sessionStorageProvider');
	ctrl.notes = dataManger.getNoteList();
	console.log(ctrl.notes);

	$scope.$on('note changed', function () {
		ctrl.notes = dataManger.getNoteList();
	});
}