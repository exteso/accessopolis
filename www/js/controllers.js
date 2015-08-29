angular.module('starter.controllers', [])
    .controller('ToDoListCtrl', function ($scope) {
        $scope.toDoListItems = [{
            task: 'Scuba Diving',
            status: 'not done'
        }, {
            task: 'Climb Everest',
            status: 'not done'
        }]
    });