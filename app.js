(function() {
  'use strict';

  angular
    .module('myFirstModule', [])
    .controller('MyFirstController', function($scope) {
      $scope.name = 'Pooja Sharma';
      $scope.asciiSum = 1141;

      $scope.sayHello = function() {
        return 'Hello';
      };

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
