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
		controller: ['dataManager', '$scope', 'urlDetector', NoteController]
	});

function NoteController(dataManger, $scope, urlDetector) {
	var ctrl = this;
	this.edit = false;

	function detectImages() {
		console.log(ctrl.textarea);
		if (ctrl.textarea) {
			ctrl.images = urlDetector.detectImagePath(ctrl.textarea);
			//for tests
			for (var i = 0; i < ctrl.images.length; i++) {
				console.log('image' + i);
				ctrl.images[i] = './images/surfing.png';
			}
		}
	}

	this.editNote = function () {
		if (this.newNote) {
			dataManger.setNote(this.textarea);
			this.textarea = null;
			this.edit = false;
			$scope.$emit('note changed');
		} else {
			if (this.edit) {
				dataManger.editNote(this.id, this.textarea);
				detectImages();
			}
			this.edit = !this.edit;
		}
	};

	this.removeNote = function () {
		dataManger.removeNote(this.id);
		$scope.$emit('note changed');
	};

	this.$onInit = function () {
		this.textarea = this.content;
		detectImages();
	}
}