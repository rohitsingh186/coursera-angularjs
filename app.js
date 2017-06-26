(function() {
  'use strict';

  angular
    .module('myFirstModule', [])
    .controller('MyFirstController', MyController);

  MyController.$inject = ['$scope', '$filter'];

  function MyController($scope, $filter) {
    $scope.name = 'POOJA SHARMA';
    $scope.asciiSum = 853;
    $scope.flashIsRunning = true;

    $scope.sayHello = function() {
      return 'Hello';
    };

    $scope.uppercaseName = function() {
      var upcase = $filter('uppercase');
      $scope.name = upcase($scope.name);
    }

    $scope.updateAscii = function(name) {
      var tempAsciiSum = 0;
      for (var i = 0; i < $scope.name.length; i++) {
        tempAsciiSum += $scope.name.charCodeAt(i);
      }
      $scope.asciiSum = tempAsciiSum;
      return $scope.asciiSum;
    }

    $scope.flashStatus = function() {
      return ($scope.flashIsRunning ? 'running' : 'standing');
    }

    $scope.flashImgExt = function() {
      return ($scope.flashIsRunning ? 'gif' : 'jpg');
    }

    $scope.toggleFlashStatus = function() {
      $scope.flashIsRunning = $scope.flashIsRunning ? false : true;
    }
  };
})();
