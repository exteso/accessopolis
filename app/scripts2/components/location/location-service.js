(function() {


  angular.module('accessopolisApp').service('LocationService', ['$q', '$firebaseObject', 'Ref', '$firebaseArray', LocationService]);


  function LocationService($q, $firebaseObject, Ref, $firebaseArray) {
  
    function find(id) {
        return $q(function(resolve, reject) {
            $firebaseObject(Ref.child('locations/'+id)).$loaded(function(val) {
                resolve(val);
            });
        });
    }

    function getComments(id) {
        return $q(function(resolve, reject) {
            $firebaseArray(Ref.child('comments/'+id)).$loaded(function(val) {
                resolve(val);
            });
        });
    }

    function getImages(id) {
        return $q(function(resolve, reject) {
          $firebaseArray(Ref.child('images/'+id)).$loaded(function(val) {
            resolve(val);
          });
        });
    }
    
    function getVideos(id) {
      return $q(function(resolve, reject) {
          $firebaseArray(Ref.child('videos/'+id)).$loaded(function(val) {
            resolve(val);
          });
        });
    }
    
    function getMedia(id) {
      return $q.all([getImages(id), getVideos(id)]).then(function(imagesAndVideos) {
      
        var medias = [];
        angular.forEach(imagesAndVideos[0], function(image) {
          image.imageThumbnailUrl = image.imageUrl;
          image.mediaType = 'image';
          medias.push(image);
        });
        
        angular.forEach(imagesAndVideos[1], function(video) {
          image.imageThumbnailUrl = image.thumbnail.replace(/default.+$/,"0.jpg");
          image.mediaType = 'video';
          medias.push(video);
        });
        
        return medias;
      });
    }

    function update(location){
        if (location.$id){
            var obj = $firebaseObject(Ref.child('locations/'+location.$id));

            obj.$loaded().then(function() {
                angular.extend(obj, location);
                return obj.$save();
            });
            return obj;
        }
    }

    function create(location) {
        return $firebaseArray(Ref.child('locations')).$add(location);
    }

    function rate(newRate){
        //FIXME
        return $firebaseArray(Ref.child('ratings')).$add(newRate);
    }
    
    //
    this.find = find;
    this.getComments = getComments;
    this.getImages = getImages;
    this.update = update;
    this.create = create;
    this.rate = rate;
    this.getMedia = getMedia;
  }

    
})();
