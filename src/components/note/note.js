/**
 * Created by Kamil on 2017-01-15.
 */
angular
	.module('app')
	.component('note', {
		templateUrl: 'components/note/note.html',
		bindings: {
			content: '@',
			images: '=',
			newNote: '<',
			placeholder: '@'
		},
		controller: ['dataManager', '$scope', NoteController]
	});

function NoteController(dataManger, $scope) {
	this.edit = false;

	this.editNote = function () {
		if(this.newNote || this.edit) {
			dataManger.setNote(this.textarea);
			$scope.$emit('note changed');
		} else {
			this.edit = !this.edit;
		}
	};

	this.$onInit = function () {
		this.textarea = this.content;
	}
}