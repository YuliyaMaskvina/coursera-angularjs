(function() {
  "use strict";

  angular.module("ShoppingListCheckOff", [])
  .controller("ToBuyController", ToBuyController)
  .controller("AlreadyBoughtController", AlreadyBoughtController)
  .service("ShoppingListCheckOffService", ShoppingListCheckOffService);


  ToBuyController.$inject = ['ShoppingListCheckOffService'];
  function ToBuyController(ShoppingListCheckOffService) {
    var controller = this;

    controller.getItemsToBuy = ShoppingListCheckOffService.getItemsToBuy();

    controller.buyItem = function (itemIndex) {
      ShoppingListCheckOffService.buy(itemIndex);
      ShoppingListCheckOffService.removeFromBuyItems(itemIndex);
    };
  }

  AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
  function AlreadyBoughtController(ShoppingListCheckOffService) {
    var controller = this;

    controller.getBoughtItems = ShoppingListCheckOffService.getBoughtItems();

  }
function ShoppingListCheckOffService() {
  var service = this;

  var itemsToBuy = [{ name: "cookies", quantity: 10 }, { name: "pies", quantity: 9 },
                    { name: "tomatoes", quantity: 8 }, {name: "chocolates", quantity: 7 },
                    { name: "apples", quantity: 6 }];
  var boughtItems = [];

  service.getItemsToBuy = function () {
    return itemsToBuy;
  };

  service.getBoughtItems = function () {
    return boughtItems;
  };

  service.buy = function (itemIndex) {
    boughtItems.push(itemsToBuy[itemIndex]);
  };

  service.removeFromBuyItems = function (itemIndex) {
    itemsToBuy.splice(itemIndex, 1);
  };

}

})();
