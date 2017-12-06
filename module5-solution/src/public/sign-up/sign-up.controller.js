(function () {
"use strict";

angular.module('public')
.controller('SignUpController', SignUpController);

SignUpController.$inject = ['MenuService', 'UserInfoService'];
function SignUpController(MenuService, UserInfoService) {
  var controller = this;

  controller.submit = function () {

    if(controller.userInfo.categoryItem) {
      var promise = MenuService.getMenuItem(controller.userInfo.categoryItem.short_name.toUpperCase());
      promise.then(function(response) {
        controller.userInfo.categoryItem = response;
        controller.notCompleted = false;
        UserInfoService.save(controller.userInfo);
      })
      .catch(function() {
        controller.notCompleted = true;
      });
    } else {
      UserInfoService.save(controller.userInfo);
      controller.notCompleted = false;
    }
  };
}

})();
