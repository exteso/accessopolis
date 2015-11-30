(function() {

  angular.module('accessopolisApp').component('apSearchResult', {
    bindings: {
      result: '='
    },
    template: ['<div>{{apSearchResult.result}}</div>'].join('')
  })
  
})();
