'use strict';

angular.module('myApp.view1', ['ngRoute'])

    .config(['$routeProvider', function($routeProvider) {
        $routeProvider.when('/view1', {
            templateUrl: 'view1/view1.html',
            controller: 'View1Ctrl'
        });
    }])
    .controller('View1Ctrl', ['$scope', '$filter', function($scope, $filter) {
        $scope.taskList = [
            {title: "Learn to code", priority: "B", deadline:"2015-04-12", done:false},
            {title: "Take out trash", priority: "C", deadline:"2015-04-08", done:true},
            {title: "Make dinner", priority: "A", deadline:"2015-04-15", done:false}
        ];
        $scope.sortField = null;
        $scope.sort = function(pred, reverse) {
            $scope.sortField = pred;
            var orderBy = $filter("orderBy");
            $scope.taskList = orderBy($scope.taskList, pred, reverse);
        };
        $scope.sort("-priority", false);
        $scope.addTask = function() {
            if($scope.task && $scope.choice) {
                var choice = document.getElementById('mylist').selectedOptions[0].value;
                var taskObj = {title: $scope.task,
                    priority: choice, deadline: $scope.deadline};
                $scope.taskList.push(taskObj);
                console.log($scope.taskList);
                $scope.task = "";
                $scope.choice = 'A';
                $scope.deadline = "";
            }
        };
        $scope.removeMe = function(task) {
            console.log("Removing", task);
            $scope.taskList = $scope.taskList.filter(
                function(t){return t !== task});
        };


        $scope.editMe = function(task) {
            console.log("Editing", task);
            $scope.taskList = $scope.taskList.filter(
                function(t){return t !== task});
            $scope.task = task.title;
            $scope.choice = task.priority;
            $scope.deadline = task.deadline;


        };
    }]);
