(function() {

  angular.module('accessopolisApp').component('apSearchBox', {
    controller: ['$location', 'SearchBoxService', function($location, SearchBoxService) {
    
      var vm = this;
      
      // initialize search if we have a search parameter!
      if($location.search().hasOwnProperty('search')) {
        vm.toSearch = $location.search().search;
        search();
      }
      //
    
      function search() {
        var toSearch = vm.toSearch || '';
        $location.search('search', toSearch);
        SearchBoxService.search({text: toSearch, type: undefined}).then(function(searchResult) {
          vm.searchResult = searchResult;
        });
      }
      
      //
      this.search = search;
    }],
    
    template: ['<div class="container">',
                 '<form class="location-search" ng-submit="apSearchBox.search()">',
                   '<div class="col-md-8 col-md-offset-2 col-sm-12 col-xs-12 accessopolis-search-field">',
                     '<div class="accessopolis-search-box row">',
                       '<span class="accessopolis-search-icon"><i class="fa fa-search fa-2x"></i></span>',
                       '<input type="text" class="form-control input-lg" placeholder="Cerca una struttura o località" ng-model="apSearchBox.toSearch">',
                     '</div>',
                     '<div class="row top-buffer" style="text-align: center;">',
                       '<button type="submit" class="btn btn-primary btn-lg col-md-12" style="width: 100%;">Cerca</button>',
                     '</div>',
                   '</div>',
                 '</form>',
                 '<div ng-if="apSearchBox.searchResult"><ap-search-result-list found="apSearchBox.searchResult"></ap-search-result-list></div>',
              ,'</div>'].join('')
  
  });
  
})();
