(function () {
"use strict";

angular.module('common')
.service('UserInfoService', UserInfoService);

function UserInfoService() {
  var service = this;
  var user = null;

  service.save = function (userInfo) {
    user = userInfo;
  };

  service.get = function (category) {
    return user;
  };

}

})();
