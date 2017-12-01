(function () {
'use strict';

angular.module('Data')
.controller('ItemDetailController', ItemDetailController);

// 'item' is injected through state's resolve
ItemDetailController.$inject = ['itemList']
function ItemDetailController(itemList) {
  var controller = this;

  controller.itemList = itemList;
}

})();
