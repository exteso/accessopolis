(function() {

  angular.module('accessopolisApp').component('apRating', {
    bindings: {
      location:'=',
    },
    controller: ['RatingService', function(RatingService) {
      var vm = this;
      RatingService.getRating(this.location.$id).then(function(rating) {
        vm.rating = rating;
      });
    }],
    
    
    template: templateRating(),
  });


  function templateRating() {
    return ['<div><div>',
        '<div class="ap-rating-rating">{{apRating.rating.staff === undefined ? \'N/A\' : apRating.rating.staff}}</div>',
        '<div class="ap-rating-icon-and-text">',
            '<span class="fa fa-user-md"></span>',
            '<div class="hidden-xs">Staff</div>',
        '</div>',
    '</div>',
    '<div>',
        '<div class="ap-rating-rating">{{apRating.rating.public === undefined ? \'N/A\' : apRating.rating.public}}</div>',
        '<div class="ap-rating-icon-and-text">',
            '<span class="fa fa-star" ></span><br />',
            '<div class="hidden-xs">Pubblico</div>',
        '</div>',
    '</div></div>'].join('');
  }

})();
