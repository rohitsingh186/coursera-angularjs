(function() {
  'use strict';

  angular
    .module('MyFirstModule', [])
    .controller('MyFirstController', MyController)
    .controller('MySecondController', MyController2)
    .controller('ParentController', ParentController)
    .controller('ChildController', ChildController)
    .controller('AddItemController', AddItemController)
    .controller('ShowItemController', ShowItemController)
    .service('ItemService', ItemService)
    .filter('palindrom', PalindromFilterFactory)
    .factory('FactoryUsingService', FactoryUsingServiceSingletonFactory)
    .controller('AnotherFactoryController', AnotherFactoryController)
    .controller('FactoryController', FactoryController)
    .provider('ShoppingListService', ShoppingListServiceProvider)
    .controller('ShoppingListController', ShoppingListController)
    .config(Configuration);

  MyController.$inject = ['$scope', '$filter', 'palindromFilter'];

  function MyController($scope, $filter, palindromFilter) {
    // week_1
    $scope.name = 'POOJA SHARMA';
    $scope.asciiSum = 853;
    $scope.flashIsRunning = true;

    // week_2
    $scope.myName = "Rohit Singh";
    $scope.shoppingList = [
      {
        name: 'Buiscuit',
        price: 10,
        quantity: 2
      },
      {
        name: 'Lemon',
        price: 1,
        quantity: 10
      },
      {
        name: 'Mango',
        price: 50,
        quantity: 5
      }];
    $scope.parent = {
      name: 'Parent',
      changeWings: 'Whatever'
    }
    $scope.child = Object.create($scope.parent);
    $scope.child.name = 'Child';

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

  function MyController2() {
    this.specialName = 'Neelam Singh';
  }

  function ParentController($scope) {
    this.pValue = 1;
    this.nValue = 3;
  }

  function ChildController($scope) {
    this.pValue = 5;
    this.kValue = 7;
  }

  AddItemController.$inject = ['ItemService'];
  function AddItemController(ItemService) {
    var itemAdder = this;
    itemAdder.itemName = '';
    itemAdder.itemQuantity = 0;

    itemAdder.addItem = function() {
      ItemService.addItem(itemAdder.itemName, itemAdder.itemQuantity);
    }
  }

  ShowItemController.$inject = ['ItemService'];
  function ShowItemController(ItemService) {
    var itemShower = this;

    itemShower.items = ItemService.getItems();

    itemShower.removeItem = function(itemIndex) {
      return ItemService.removeItem(itemIndex);
    }
  }

  function ItemService() {
    var service = this;

    var items = [];

    service.addItem = function(itemName, itemQuantity) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      }

      items.push(item);
    }

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    }

    service.getItems = function() {
      return items;
    }
  }

  function PalindromFilterFactory() {
    return function(input) {
      return input.split('').reverse().join('');
    };
  };

  function FactoryUsingService() {
    var factoryUsingService = this;

    factoryUsingService.heyYouMessage = 'Hey You!';
  }

  function FactoryUsingServiceSingletonFactory() {
    var fa
    var singletonFactoryUsingService = new FactoryUsingService();

    return function() {
      return singletonFactoryUsingService;
    };
  }

  FactoryController.$inject = ['FactoryUsingService'];
  function FactoryController(FactoryUsingService) {
    var fCtrl = this;
    fCtrl.heyYouMessage = FactoryUsingService().heyYouMessage;
  }

  AnotherFactoryController.$inject = ['FactoryUsingService'];
  function AnotherFactoryController(FactoryUsingService) {
    var afCtrl = this;
    afCtrl.heyYouMessage = FactoryUsingService().heyYouMessage;
  }

  function ShoppingListService(maxItems) {
    var service = this;

    var items = [];

    service.addItem = function(itemName, itemQuantity) {
      var item = {
        name: itemName,
        quantity: itemQuantity
      }

      if ((maxItems === undefined) ||
          ((maxItems !== undefined) && (maxItems > items.length))) {
        items.push(item);
      } else {
        throw new Error('Max items (' + maxItems + ') reached!');
      }
    }

    service.removeItem = function(itemIndex) {
      items.splice(itemIndex, 1);
    }

    service.getItems = function() {
      return items;
    }
  }

  function ShoppingListServiceProvider() {
    var provider = this;
    provider.defaultMaxItems = 3;

    provider.$get = function() {
      return new ShoppingListService(provider.defaultMaxItems);
    }
  }

  Configuration.$inject = ['ShoppingListServiceProvider'];
  function Configuration(ShoppingListServiceProvider) {
    ShoppingListServiceProvider.defaultMaxItems = 2;
  }

  ShoppingListController.$inject = ['ShoppingListService'];
  function ShoppingListController(ShoppingListService) {
    var ctrl = this;
    ctrl.itemName = '';
    ctrl.itemQuantity = 0;
    ctrl.errorMessage = undefined;

    ctrl.addItem = function() {
      try {
        ShoppingListService.addItem(ctrl.itemName, ctrl.itemQuantity);
      } catch (error) {
        ctrl.errorMessage = error.message;
      }
    }

    ctrl.items = ShoppingListService.getItems();

    ctrl.removeItem = function(itemIndex) {
      ShoppingListService.removeItem(itemIndex);
      if (ctrl.errorMessage !== undefined) {
        ctrl.errorMessage = undefined;
      }
    }
  }
})();
