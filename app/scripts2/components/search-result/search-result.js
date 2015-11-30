(function() {

  angular.module('accessopolisApp').component('apSearchResult', {
    bindings: {
      result: '='
    },
    template: ['<div><div>',
                  '<div class="ap-search-result-icon-container">', iconTemplate(),'</div>',
                  '<div class="ap-search-result-description">{{apSearchResult.result}}</div>',
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
