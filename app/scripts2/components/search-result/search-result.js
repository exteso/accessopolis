(function() {

  angular.module('accessopolisApp').component('apSearchResult', {
    bindings: {
      result: '='
    },
    controller: ['$location', function($location) {
    
      var vm = this;
    
      function showDetail() {
        $location.path('/location/'+vm.result.$id);
      }
      
      
      //
      this.showDetail = showDetail;
    
    }],
    template: ['<div><div>',
                  '<div class="ap-search-result-icon-container">', iconTemplate(),'</div>',
                  '<div class="ap-search-result-description" ng-click="apSearchResult.showDetail()"><a href="">', 
                    '<h3 class="ap-search-result-text">{{::apSearchResult.result.text}}</h3>',
                    '<div class="ap-search-result-address">{{::apSearchResult.result.address}}</div>',
                  '</a></div>',
               '</div></div>'].join('')
  })
  
  
  
  
  function iconTemplate() {
    return [ '<span class="fa fa-thumb-tack" ng-class="{\'fa-coffee\': apSearchResult.result.type === \'bar\',',
                         '\'fa-cutlery\': apSearchResult.result.type == \'restaurant\',',
                         '\'fa-bed\': apSearchResult.result.type === \'hotels\',',
                         '\'fa-beer\': apSearchResult.result.type === \'pub\',',
                         '\'fa-train\': apSearchResult.result.type === \'train-stations\'}">',
            '</span>'].join('');
  }
})();
