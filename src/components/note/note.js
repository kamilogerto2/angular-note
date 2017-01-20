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
			id: '<',
			placeholder: '@'
		},
		controller: ['dataManager', '$scope', NoteController]
	});

function NoteController(dataManger, $scope) {
	this.edit = false;

	this.editNote = function () {
		if(this.newNote) {
			dataManger.setNote(this.textarea);
			$scope.$emit('note changed');
		} else {
			if(this.edit) {
				dataManger.editNote(this.id, this.textarea);
			}
			this.edit = !this.edit;
		}
	};

	this.$onInit = function () {
		this.textarea = this.content;
	}
}