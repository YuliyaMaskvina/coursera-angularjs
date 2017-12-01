(function () {
'use strict';

angular.module('Data')
.component('categories', {
  templateUrl: 'src/menulist/templates/categoriesinmenu.template.html',
  bindings: {
    items: '<'
  }
});

})();
