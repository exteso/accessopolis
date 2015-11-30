(function() {

  angular.module('accessopolisApp').component('apSearchResultList', {
    bindings: {
      found: '='
    },
    template: ['<div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12"><div class="row">',
                 '<ul>',
                   '<li ng-repeat="found in apSearchResultList.found">',
                     '<ap-search-result result="found"></ap-search-result>',
                   '</li>',
                 '</ul>',
               '</div></div>'].join('')
  })
  
})();
