function Todo(options) {
    this.task = options.task;
    this.status = options.status;
    this.editing = false;
}


module.exports = angular.module('app.services.main', [])
    .service('MainService', [function () {
        let self = this;
        let todos = [
            new Todo({ id: 0, task: 'Buy a unicorn', status: false, editing: false }),
            new Todo({ id: 1, task: 'Taste JavaScript', status: true, editing: false })
        ];
        this.getData = function () {
            return todos;
        };
        this.getCount = function () {
            return todos.length;
        };
        this.getCompleteCount = function () {
            let temp = 0;
            todos.forEach(function (item, index) {
                if (item.status === false) {
                    temp += 1;
                }
            });
            return temp;
        };
        this.add = function (id, task) {
            todos.push(new Todo(
                {
                    id: id,
                    task: task,
                    status: false,
                    editing: false
                }
            ));
        };
        this.remove = function (todo) {
            let index = todos.indexOf(todo);
            todos.splice(index, 1);
        };
        this.clearCompleted = function () {
            let result = [];
            todos.forEach((todo, index) => {
                if (!todo.status) {
                    result.push(todo);
                }
            });
            todos = result;
            console.log(todos);
        };
        this.update = function (option) {
            let index = todos.indexOf(option);
            if (index !== -1) {
                todos[index].task = option.task;
                todos[index].status = option.status;
                todos[index].editing = option.editing;
            }
            // if(todos.indexOf(option)){
            //     console.log
            // }
        };
    }]);