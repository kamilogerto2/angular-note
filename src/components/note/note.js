/**
 * Created by Kamil on 2017-01-15.
 */
angular
	.module('app')
	.component('note', {
		templateUrl: 'components/note/note.html',
		bindings: {
			content: '@',
			images: '='
		}
	});