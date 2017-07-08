(function() {
  'use strict';

  angular
    .module('MyFirstModule', [])
    .controller('ShoppingController', ShoppingController)
    .service('ShoppingService', ShoppingService)
    .service('WeightLossFilterService', WeightLossFilterService)
    .controller('RestaurantController', RestaurantController)
    .service('RestaurantService', RestaurantService)
    .constant('ApiBasePath', 'http://davids-restaurant.herokuapp.com');

  ShoppingController.$inject = ['ShoppingService'];
  function ShoppingController(ShoppingService) {
    // week_3
    var ctrl = this;

    ctrl.itemName = '';
    ctrl.itemQuantity = '';

    ctrl.itemNameSync = '';
    ctrl.itemQuantitySync = '';

    ctrl.items = ShoppingService.getItems();

    ctrl.errorMessage = function() {
      return ShoppingService.getErrorMessage();
    }

    ctrl.addItem = function() {
      ShoppingService.addItem(ctrl.itemName, ctrl.itemQuantity);
    };

    ctrl.addItemWithSynchronousCheck = function() {
      ShoppingService.addItemWithSynchronousCheck(ctrl.itemNameSync, ctrl.itemQuantitySync);
    };

    ctrl.removeItem = function(itemIndex) {
      ShoppingService.removeItem(itemIndex);
    };
  }

  RestaurantController.$inject = ['RestaurantService', '$scope'];
  function RestaurantController(RestaurantService, $scope) {
    var ctrl = this;

    ctrl.categories = [];
    ctrl.menuQueryShortName = undefined;
    ctrl.categoryErrorMessage = undefined;
    ctrl.menuErrorMessage = undefined;

    $scope.$watch('ctrl.menuQueryShortName', function(newValue, oldValue) {
      RestaurantService.getMenuByCategoryShortName(newValue)
      .then(function success(response) {
          ctrl.menus = response.data.menu_items;
        }
      )
      .catch(function failure(response) {
          ctrl.menuErrorMessage = 'Oops, something went wrong !';
        }
      );
    });

    RestaurantService.getCategories()
    .then(function success(response) {
        ctrl.categories = response.data;
      }
    )
    .catch(function failure(response) {
        ctrl.categoryErrorMessage = 'Oops, something went wrong !';
      }
    );

    ctrl.updateMenuList = function(menuQueryShortName) {
      ctrl.menuQueryShortName = menuQueryShortName;
    }
  }

  ShoppingService.$inject = ['$q', 'WeightLossFilterService'];
  function ShoppingService($q, WeightLossFilterService) {
    var srvc = this;

    srvc.items = [];
    srvc.errorMessage = undefined;

    srvc.addItem = function(itemName, itemQuantity) {
      srvc.errorMessage = undefined;
      var namePromise = WeightLossFilterService.checkItemName(itemName);

      namePromise
      .then(function(result) {
        return WeightLossFilterService.checkItemQuantity(itemQuantity);
      })
      .then(function(result) {
        var tmpItem = {
          name: itemName,
          quantity: itemQuantity
        };

        srvc.items.push(tmpItem);
      })
      .catch(function(error) {
        srvc.errorMessage = error.errorMessage;
      });
    };

    srvc.addItemWithSynchronousCheck = function(itemName, itemQuantity) {
      srvc.errorMessage = undefined;
      var namePromise = WeightLossFilterService.checkItemName(itemName);
      var quantityPromise = WeightLossFilterService.checkItemQuantity(itemQuantity);

      $q.all([namePromise, quantityPromise])
      .then(function(result) {
        var tmpItem = {
          name: itemName,
          quantity: itemQuantity
        };

        srvc.items.push(tmpItem);
      })
      .catch(function(error) {
        srvc.errorMessage = error.errorMessage;
      });
    };

    srvc.removeItem = function(itemIndex) {
      srvc.errorMessage = undefined;
      srvc.items.splice(itemIndex, 1);
    };

    srvc.getItems = function() {
      return srvc.items;
    };

    srvc.getErrorMessage = function() {
      return srvc.errorMessage;
    };
  }

  WeightLossFilterService.$inject = ['$q', '$timeout'];
  function WeightLossFilterService($q, $timeout) {
    var srvc = this;

    srvc.result = {
      message: ''
    };

    srvc.checkItemName = function(itemName) {
      var deferred = $q.defer();

      $timeout(function() {
        if (itemName.toLowerCase().indexOf('cookie') === -1) {
          deferred.resolve(srvc.result);
        } else {
          srvc.result.errorMessage = 'Not cookie again !!!';
          deferred.reject(srvc.result);
        }
      }, 1000);

      return deferred.promise;
    };

    srvc.checkItemQuantity = function(itemQuantity) {
      var deferred = $q.defer();

      $timeout(function() {
        if (itemQuantity <= 5) {
          deferred.resolve(srvc.result);
        } else {
          srvc.result.errorMessage = 'Too much man !!!';
          deferred.reject(srvc.result);
        }
      }, 500);

      return deferred.promise;
    };
  }

  RestaurantService.$inject = ['$http', 'ApiBasePath'];
  function RestaurantService($http, ApiBasePath) {
    var srvc = this;

    srvc.getCategories = function() {
      return $http({
        method: "GET",
        url: (ApiBasePath + '/categories.json')
      });
    };

    srvc.getMenuByCategoryShortName = function(categoryShortName) {
      return $http({
        method: "GET",
        url: (ApiBasePath + '/menu_items.json'),
        params: {category: categoryShortName}
      });
    }
  }
})();
