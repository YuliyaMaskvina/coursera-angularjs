(function () {
'use strict';

angular.module('MenuApp')
.config(RoutesConfig);

RoutesConfig.$inject = ['$stateProvider', '$urlRouterProvider'];
function RoutesConfig($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/');

  $stateProvider
  .state('home', {
    url: '/',
    templateUrl: 'src/menulist/templates/home.template.html'
  })
  .state('categories', {
    url: '/categories',
    templateUrl: 'src/menulist/templates/categories.template.html',
    controller: 'CategoriesController as mainList',
    resolve: {
      categoryList: ['MenuDataService', function (MenuDataService) {
        return MenuDataService.getAllCategories()
          .then(function (items) {
            return items;
          });
      }]
    }
  })
  .state('itemDetail', {
    url: '/items/{shortName}',
    templateUrl: 'src/menulist/templates/item-detail.template.html',
    controller: 'ItemDetailController as itemDetail',
    resolve: {
      itemList: ['$stateParams', 'MenuDataService',
            function ($stateParams, MenuDataService) {
              return MenuDataService.getItemsForCategory($stateParams.shortName)
                .then(function (items) {
                  return items;
                });
            }]
    }
  });
}

})();
