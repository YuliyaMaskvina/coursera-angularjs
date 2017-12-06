(function () {
"use strict";

angular.module('public')
.controller('UserInfoController', UserInfoController);

UserInfoController.$inject = ['userInfo', 'ApiPath'];
function UserInfoController(userInfo, ApiPath) {
  var controller = this;
  controller.userInfo = userInfo;
  controller.basePath = ApiPath;

}

})();
