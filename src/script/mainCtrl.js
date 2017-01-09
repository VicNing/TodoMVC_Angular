require('./mainService');

function Todo(options) {
    this.task = options.task;
    this.status = options.status;
    this.editing = false;
}

module.exports = angular.module('app.controllers.main', ['app.services.main']).
    controller('MainController', ['$scope', '$location', 'MainService',
        function ($scope, $location, MainService) {
            console.log(MainService);
            $scope.$location = $location;
            $scope.checkAll = false;
            $scope.input = '';
            $scope.todos = MainService.getData();
            $scope.getCount = MainService.getCompleteCount;
            $scope.add = function ($event) {
                if ($event.key === 'Enter' && this.input) {
                    MainService.add(MainService.getCount() + 1, $scope.input);
                    this.input = '';
                }
            };
            $scope.remove = MainService.remove;
            // $scope.clear = MainService.clearCompleted;
            $scope.clear = function () {
                MainService.clearCompleted();
                $scope.todos = MainService.getData();
            };
            $scope.show = function () {
                for (let i = 0; i < MainService.getCount(); i++) {
                    if (this.todos[i].status) {
                        return true;
                    }
                }
                return false;
            };
            $scope.dbclick = function (todo) {
                todo.editing = true;
                MainService.update(todo);
            };
            $scope.submit = function ($event, todo) {
                if ($event.key === 'Enter' && todo.task) {
                    todo.editing = false;
                    MainService.update(todo);
                }
            };
            $scope.toggle = function () {
                this.todos.forEach((todo, index) => {
                    todo.status = this.checkAll;
                });
            };
            $scope.selector = function (item, index, arr) {
                switch ($location.hash()) {
                    case '/completed':
                        if (item.status) {
                            return item;
                        } else {
                            break;
                        }
                    case '/active':
                        if (!item.status) {
                            return item;
                        } else {
                            break;
                        }
                    default:
                        return item;
                }
            };
        }]);