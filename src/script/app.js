const angular = require('angular');
//css
require('../css/app.css');

function Todo(options) {
	this.task = options.task;
	this.status = options.status;
	this.editing = false;
}

const app = angular.module('app', []);
app.controller('MainController', ['$scope', function ($scope) {
	$scope.checkAll = false;
	$scope.input = '';
	$scope.editingID = -1;
	$scope.todos = [
		new Todo({ id: 0, task: 'Buy a unicorn', status: false, editing: false }),
		new Todo({ id: 1, task: 'Taste JavaScript', status: true, editing: false })
	];
	$scope.getCount = function () {
		let temp = 0;
		this.todos.forEach(function (item, index) {
			if (item.status === false) {
				temp += 1;
			}
		});
		return temp;
	};
	$scope.add = function ($event) {
		if ($event.key === 'Enter' && this.input) {
			this.todos.push(new Todo(
				{
					id: $scope.todos.length + 1,
					task: $scope.input,
					status: false,
					editing: false
				}
			));
			this.input = '';
		}
	}
	$scope.remove = function (todo) {
		let index = this.todos.indexOf(todo);
		this.todos.splice(index, 1);
	};
	$scope.clear = function () {
		let result = [];
		$scope.todos.forEach((todo, index) => {
			if (!todo.status) {
				result.push(todo);
			}
		});
		$scope.todos = result;
	};
	$scope.show = function () {
		for (let i = 0; i < this.todos.length; i++) {
			if (this.todos[i].status) {
				return true;
			}
		}
		return false;
	};
	$scope.dbclick = function (todo) {
		todo.editing = true;
	};
	$scope.submit = function ($event, todo) {
		if ($event.key === 'Enter' && todo.task) {
			todo.editing = false;
		}
	}
	$scope.toggle = function () {
		this.todos.forEach((todo, index) => {
			todo.status = this.checkAll;
		});
	};
}]);

