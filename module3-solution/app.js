(function() {

"use strict";
angular.module('NarrowItDownApp', [])
.controller('NarrowItDownController', NarrowItDownController)
.controller('MenuListDirectiveController', MenuListDirectiveController)
.directive('foundItems', FoundItems)
.service('MenuSearchService', MenuSearchService)
.constant('ApiBasePath', "http://davids-restaurant.herokuapp.com");

function FoundItems() {
  var ddo = {
    templateUrl: 'foundItems.html',
    scope: {
      items: '<',
      onRemove: '='
    },
    controller: MenuListDirectiveController,
    controllerAs: 'list',
    bindToController: true

  };

  return ddo;
}

function MenuListDirectiveController() {
  var list = this;

  list.checkForEmpty = function() {
    return list.items && list.items.length === 0;
  }
}

NarrowItDownController.$inject = ['MenuSearchService']
function NarrowItDownController(MenuSearchService) {
  var list = this;

  list.searchTerm = "";

  list.find = function(searchTerm) {
    list.found = [];

    if(searchTerm) {
      var promise = MenuSearchService.getMatchedMenuItems(searchTerm);
      promise.then(function(response) {
        list.found = response;
      });
    }
  }

  list.removeItem = function(index) {
    MenuSearchService.removeItem(list.found, index);
  }


}

MenuSearchService.$inject = ['$http', 'ApiBasePath']
function MenuSearchService($http, ApiBasePath) {
  var service = this;

  service.getMatchedMenuItems = function(searchTerm) {
    return $http({
      method: "GET",
      dataType : "json",
      url: (ApiBasePath + "/menu_items.json")
    }).then(function(response) {
      var found = [];
      var menuItems = response.data.menu_items;
      for(var i = 0; i < menuItems.length; i ++) {
        var description = menuItems[i].description;
        if(description == null) {
          continue;
        }

        description = description.toLowerCase();
        if(description.indexOf(searchTerm) !== -1) {
          found.push(menuItems[i]);
        }
      }
      return found;
    })
  };

  service.removeItem = function(array, index) {
    if(array != null) {
      array.splice(index, 1);
    }
  };

  // service.getMenuCategories = function() {
  //   var response = $http({
  //     method: "GET",
  //     url: (ApiBasePath + "/menu_items.json")
  //   });
  //
  //   return response;
  // };
}
})();
