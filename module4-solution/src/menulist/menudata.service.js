(function () {
'use strict';

angular.module('Data')
  .service('MenuDataService', MenuDataService)
  .constant('RestaurantApiBasePath', 'https://davids-restaurant.herokuapp.com');

MenuDataService.$inject = ['$http', 'RestaurantApiBasePath']
function MenuDataService($http, RestaurantApiBasePath) {
  var service = this;

  service.getAllCategories = function() {
    return $http({
      method: "GET",
      dataType: "json",
      url: (RestaurantApiBasePath + "/categories.json")
    }).then(function(response) {
      var emptyList = [];
      return response.data ? response.data : emptyList;
    })
  }

  service.getItemsForCategory = function(categoryShortName) {
    return $http({
      method: "GET",
      dataType: "json",
      params: {
        category : categoryShortName
      },
      url: (RestaurantApiBasePath + "/menu_items.json")
    }).then(function(response) {
      var emptyList = [];
      return response.data.menu_items ? response.data.menu_items : emptyList;
    })
  }
}

})();
