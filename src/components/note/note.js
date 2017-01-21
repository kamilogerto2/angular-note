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
	ctrl.edit = false;

	function detectImages() {
		console.log(ctrl.textarea);
		if (ctrl.textarea) {
			ctrl.images = urlDetector.detectImagePath(ctrl.textarea);
			/*//for tests
			for (var i = 0; i < ctrl.images.length; i++) {
				console.log('image' + i);
				ctrl.images[i] = './images/surfing.png';
			}*/
		}
	}

	ctrl.editNote = function () {
		if (ctrl.newNote) {
			dataManger.setNote(ctrl.textarea);
			ctrl.textarea = null;
			ctrl.edit = false;
			$scope.$emit('note changed');
		} else {
			if (ctrl.edit) {
				dataManger.editNote(ctrl.id, ctrl.textarea);
				detectImages();
			}

			ctrl.edit = !ctrl.edit;
		}
	};

	ctrl.onEnter = function (keyEvent) {
		if (keyEvent.which === 13) {
			ctrl.editNote();
		}
	};

	ctrl.removeNote = function () {
		dataManger.removeNote(ctrl.id);
		$scope.$emit('note changed');
	};

	ctrl.$onInit = function () {
		ctrl.textarea = ctrl.content;
		detectImages();
	}
}