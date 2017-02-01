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
		controller: ['dataManager', '$scope', 'urlDetector', '$timeout', NoteController]
	});

function NoteController(dataManger, $scope, urlDetector, $timeout) {
	var ctrl = this;
	ctrl.edit = false;

	/**
	 * detect images paths in note content via detector service
	 */
	function detectImages() {
		if (ctrl.content) {
			ctrl.images = urlDetector.detectImagePath(ctrl.content);
		}
	}

	/**
	 * handle focus in the note textarea
	 */
	ctrl.handleFocus = function () {
		ctrl.edit = true;
	};

	/**
	 * edit note - add new if is needed
	 */
	ctrl.editNote = function () {
		// timeout is needed to correct handle edit action
		$timeout((function () {
			if ((ctrl.newNote && ctrl.content)) {
				dataManger.setNote(ctrl.content);
				ctrl.content = null;
				ctrl.edit = false;
				$scope.$emit('note changed');
			} else if (ctrl.edit) {
				dataManger.editNote(ctrl.id, ctrl.content);
				detectImages();
				ctrl.edit = false;
			}
		}), 200);
	};

	/**
	 * emit event that leads to focus event on note textarea
	 * @param $event
	 */
	ctrl.changeFocus = function ($event) {
		if (!($event.srcElement.innerText === 'Save')) {
			$scope.$emit(ctrl.id);
		}
	};

	/**
	 * Action when Enter button is pressed
	 * @param keyEvent - key which was pressed
	 */
	ctrl.onEnter = function (keyEvent) {
		if (keyEvent.which === 13) {
			$scope.$broadcast(ctrl.id + '-blur');
		}
	};

	/**
	 * Remove note from list.
	 */
	ctrl.removeNote = function () {
		dataManger.removeNote(ctrl.id);
		$scope.$emit('note changed');
	};

	/**
	 * Detecting images on init single note view
	 */
	ctrl.$onInit = function () {
		detectImages();
	};
}
