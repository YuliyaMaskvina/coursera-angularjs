(function() {
  "use strict";

  angular.module("LunchCheck", [])
  .controller("LunchCheckController", LunchCheckController);

  LunchCheckController.$inject = ['$scope'];
  function LunchCheckController($scope) {

    $scope.validateDishes = function () {
      var dishes = $scope.dishes ? $scope.dishes.split(',') : null;

      dishes = dishes != null ? dishes.filter(function(v){return v.trim().length>0}): null;

      if(dishes == null || dishes.length == 0) {
        $scope.msg = "no_dishes_msg";
      } else if (dishes.length > 3) {
        $scope.msg = "dishes_size_msg";
      } else {
        $scope.msg = "success_msg";
      }

    };
  }



})();
