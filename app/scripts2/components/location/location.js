(function() {

  angular.module('accessopolisApp').component('apLocation', {

    template: topTemplate() + bodyTemplate(),
    bindings: {
      identifier:'=',
    },
    controller: ['$location', 'LocationService', 'UserService', function($location, LocationService, UserService) {
      var vm = this;

      LocationService.find(this.identifier).then(function(location) {
        vm.location = location;
      });

      LocationService.getComments(this.identifier).then(function(comments) {
        vm.comments = comments;
      });

      LocationService.getMedia(this.identifier).then(function(media) {
        vm.media = media;
      });

      function isCurrentUser(user){
          return true;
      }

      function isAdmin(){
        return UserService.getProfile() && UserService.getProfile().isAdmin;
      }

      function backToHome() {
        $location.path('/');
      }

      function addNewComment() {
        vm.savingComment = true;

        vm.comments.$add({text: vm.newComment, userId : Auth.$getAuth().uid}).then(function() {
          vm.newComment = null;
          vm.savingComment = false;
        });
      };

      function updateComment(comment) {
          vm.savingComment = true;
          LocationService.updateComment(this.identifier, comment).then(function() {
              vm.savingComment = false;
          },function(error){
              alert("Error while updating a comment. "+error);
          });
      };

      function edit(location) {
          $location.path('/location/'+location.$id+'/edit');
      };

      this.backToHome = backToHome;
      this.addNewComment = addNewComment;
      this.updateComment = updateComment;
      this.isCurrentUser = isCurrentUser;
      this.isAdmin = isAdmin;
      this.edit = edit;
    }]
  })

  function topTemplate() {
    return [
    '<div class="accessopolis-location-detail col-xs-12" style="background: #000 !important;">',
        '<div class="container accessopolis-location-detail-header-wrap">',
            '<div class="accessopolis-location-detail-back col-md-12 col-sm-12 col-xs-12">',
                '<button type="button" data-ng-click="apLocation.backToHome()" class="btn btn-primary btn-xs">',
                    '<span class="fa fa-chevron-left"></span> <span>Torna alla lista</span>',
                '</button>',
                '<button type="button" data-ng-if="apLocation.isAdmin()" ng-show-auth data-ng-click="apLocation.edit(apLocation.location)" class="btn btn-primary btn-xs">',
                    '<span class="fa fa-edit"></span> <span data-translate>accessopolis.edit-location</span>',
                '</button>',
            '</div>',
            '<div class="accessopolis-location-detail-header col-md-12 col-sm-12 col-xs-12">',
                '<div class="accessopolis-location-detail-header-title col-md-8 col-sm-8 col-xs-12">',
                    '<h1>{{apLocation.location.text}}</h1>',
                    '<div>{{apLocation.location.address}}</div>',
                '</div>',
                '<div class="col-md4 col-sm-4 col-xs-4 hidden-xs hidden-sm accessopolis-location-detail-header-rating "><ap-rating ng-if="apLocation.location" location="apLocation.location"></ap-rating></div>',
            '</div>',
      '</div>',
    '</div>'
    ].join('');
  }

  function bodyTemplate() {
    return ['<div class="col-xs-12">',
              '<div class="container accessopolis-location-detail-content">',
                '<div class="accessopolis-bg-white col-md-12 col-sm-12 col-xs-12 accessopolis-location-detail-content-slide">'+imagesAndLocationTemplate()+'</div>',
                '<div class="col-md-12 col-sm-12 col-xs-12 accessopolis-bg-white" style="padding-bottom: 50px; margin-bottom: 20px;  margin-top: 10px;">', //comments
                   '<h1>Commenti:</h1>',
                   '<ul class="list-group col-md-12 col-sm-12 col-xs-12" style="list-style-type: none">',
                    commentTemplate(),
                   '</ul>',
                   insertCommentTemplate(),
                '</div>',
              '</div>',
            '</div>'].join('');
  }


  function commentTemplate() {
    return ['<li class="list-group-item" ng-repeat="comment in apLocation.comments track by comment.$id" style="float: left; width: 100%;">',
              '<div style="width: 50px; height: 50px; float: left; ">',
                '<div style="float: left; overflow:hidden;width: 50px; height: 50px; background: #ccc; color:#fff; text-align: center; border-radius: 50%;  line-height: 50px;border:1px solid #ccc; ">',
                  '<ap-avatar user-id="comment.userId"></ap-avatar>',
                '</div>',
              '</div>',
              '<div ng-if="!comment.editMode" style="float: left; height: 50px; line-height: 50px; margin-left: 10px; " ng-bind="::comment.text"></div>',
              '<input ng-if="comment.editMode"  type="text" class="form-control"  ng-model="comment.text" ng-blur="apLocation.updateComment(comment)">',
              '<span ng-if="apLocation.isCurrentUser(comment.userId)" class="fa fa-trash" ng-click="apLocation.delete(comment)" style="float: right; margin-right: 10px; "></span>',
              '<span class="fa fa-edit" ng-click="comment.editMode = !comment.editMode" style="float: right; margin-right: 10px; "></span>',
        '</li>',
            '<li ng-if="apLocation.comments.length == 0">Nessun commento!</li>'].join('');
  }

  function insertCommentTemplate() {
    return ['<div class="col-md-12 col-sm-12 col-xs-12" ng-if="apLocation.isAuth">',
                    '<form ng-submit="apLocation.addNewComment()">',
                        '<div class="form-group">',
                            '<input type="text" class="form-control" placeholder="Il vostro commento..." ng-model="apLocation.newComment">',
                        '</div>',
                        '<button type="submit" class="btn btn-sm btn-primary" ng-disabled="!apLocation.newComment || apLocation.savingComment">Commenta</button>',
                    '</form>',
                '</div>'].join('');
  }

  function imagesAndLocationTemplate() {
    return ['<div class="col-xs-12 col-md-6 ap-location-media">',mediaTemplate(),'</div>',
            '<div class="col-xs-12 col-md-6 ap-location-google-map" data-ng-if="apLocation.location">',
              locationTemplate(),
            '</div>'].join('');
  }


  function mediaTemplate() {
    return ['<div><img ng-if="apLocation.media[0]" ng-src="{{apLocation.media[0].imageThumbnailUrl}}" class="img-responsive center-block"></div>'].join('');
  }


  function locationTemplate() {
    return ['<a href="https://google.com/maps?z=12&t=m&q=loc:{{apLocation.location.lat}}+{{apLocation.location.long}}" title="{{apLocation.location.text}}, {{apLocation.location.address}}" target="_blank">',
              '<div class="hidden-xs" style="height:400px;width:400px; background-image: url(\'https://maps.googleapis.com/maps/api/staticmap?center={{apLocation.location.lat}},{{apLocation.location.long}}&zoom=15&size=400x400&maptype=roadmap&markers=color:red%7Clabel:C%7C{{apLocation.location.lat}},{{apLocation.location.long}}\'); background-size: cover"></div>',
              '<div class="visible-xs" style="height:244px;width:244px; background-image: url(\'https://maps.googleapis.com/maps/api/staticmap?center={{apLocation.location.lat}},{{apLocation.location.long}}&zoom=15&size=244x244&maptype=roadmap&markers=color:red%7Clabel:C%7C{{apLocation.location.lat}},{{apLocation.location.long}}\'); background-size: cover"></div>',
            '</a>'].join('');
  }


})();
