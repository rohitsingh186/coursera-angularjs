(function() {
  'use strict';

  angular
    .module('MyFirstModule', [])
    .controller('MyFirstController', MyController)
    .filter('palindrom', PalindromFilterFactory);

  MyController.$inject = ['$scope', '$filter', 'palindromFilter'];

  function MyController($scope, $filter, palindromFilter) {
    // week_1
    $scope.name = 'POOJA SHARMA';
    $scope.asciiSum = 853;
    $scope.flashIsRunning = true;

    // week_2
    $scope.myName = "Rohit Singh";

    // week_1
    $scope.sayHello = function() {
      return 'Hello';
    };

    $scope.uppercaseName = function() {
      var upcase = $filter('uppercase');
      $scope.name = upcase($scope.name);
    };

    $scope.updateAscii = function() {
      var tempAsciiSum = 0;
      for (var i = 0; i < $scope.name.length; i++) {
        tempAsciiSum += $scope.name.charCodeAt(i);
      }
      $scope.asciiSum = tempAsciiSum;
      return $scope.asciiSum;
    };

    $scope.flashStatus = function() {
      return ($scope.flashIsRunning ? 'running' : 'standing');
    };

    $scope.flashImgExt = function() {
      return ($scope.flashIsRunning ? 'gif' : 'jpg');
    };

    $scope.toggleFlashStatus = function() {
      $scope.flashIsRunning = $scope.flashIsRunning ? false : true;
    };

    // week_2
    $scope.reverseMe = function() {
      return palindromFilter($scope.myName);
    };
  };

  function PalindromFilterFactory() {
    return function(input) {
      return input.split('').reverse().join('');
    };
  };
})();
