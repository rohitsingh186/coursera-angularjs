(function() {
  'use strict';

  angular
    .module('MyFirstModule', [])
    .controller('MyFirstController', MyController);

  MyController.$inject = ['$scope'];

  function MyController($scope) {
  };
})();
