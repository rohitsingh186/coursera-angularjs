(function() {
  'use strict';

  angular
    .module('MyFirstModule', [])
    .controller('MyFirstController', MyController)
    .filter('palindrom', PalindromFilterFactory);

  MyController.$inject = ['$scope', 'palindromFilter'];

  function MyController($scope, palindromFilter) {
    $scope.name = "Ro";

    $scope.reverseMe = function() {
      return palindromFilter($scope.name);
    };
  };

  function PalindromFilterFactory() {
    return function(input) {
      return input.split('').reverse().join('');
    }
  };
})();
