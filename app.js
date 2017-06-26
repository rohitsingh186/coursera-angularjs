(function() {
  'use strict';

  angular
    .module('myFirstModule', [])
    .controller('MyFirstController', function($scope, $filter) {
      $scope.name = 'Pooja Sharma';
      $scope.asciiSum = 1141;

      $scope.sayHello = function() {
        return 'Hello';
      };

      $scope.uppercaseName = function() {
        var upcase = $filter('uppercase');
        $scope.name = upcase($scope.name);
      }

      $scope.updateAscii = function() {
        $scope.asciiSum = nameAsciiSum($scope.name);
      }

      var nameAsciiSum = function(name) {
        var tempAsciiSum = 0;
        for (var i = 0; i < name.length; i++) {
          tempAsciiSum += name.charCodeAt(i);
        }
        return tempAsciiSum;
      }
    })

})();
