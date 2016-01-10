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
                '</div>',
                '<div class="row">',
                  '<div data-ng-if="apSearchResultList.found.length==0" class="text-center alert alert-info col-md-12">',
                    '<h1 data-translate>accessopolis.location.not-found</h1>',
                    '<a href="#/new-location" class="btn btn-lg btn-success" ng-show-auth="">',
                    '<i class="fa fa-plus"></i> <span data-translate>accessopolis.location.new</span></a>',
                '</div>',
               '</div></div>'].join('')

  })

})();
