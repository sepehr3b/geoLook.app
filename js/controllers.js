angular.module('starter.controllers', [])


.controller('AppCtrl', function() {

  })





  .controller('ListCtrl', function($scope,$window,$http,$ionicModal,$ionicHistory,$timeout) {
    var newmap;
    var gx;
    var gy;

    $window.navigator.geolocation.getCurrentPosition(function (position) {
      $scope.$apply(function () {
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;

        url = "https://api.foursquare.com/v2/venues/search?ll=" + $scope.lat + "," + $scope.lng + "&oauth_token=00QSVLFXSKRYI5YVCZMP0ZWQ3RZSUNS1E3FFXRCRKMYMY2OQ&v=20160511";
        $http.get(url)
          .success(function (data) {
            $scope.data = data.response.venues;
            alert('SUCCESS!');
          })
          .error(function () {
            alert('ERROR');
          });


      });
    });

    $scope.doRefresh = function () {
      $window.navigator.geolocation.getCurrentPosition(function (position) {
        $scope.$apply(function () {
          $scope.lat = position.coords.latitude;
          $scope.lng = position.coords.longitude;

          url = "https://api.foursquare.com/v2/venues/search?ll=" + $scope.lat + "," + $scope.lng + "&oauth_token=00QSVLFXSKRYI5YVCZMP0ZWQ3RZSUNS1E3FFXRCRKMYMY2OQ&v=20160511";
          $http.get(url)
            .success(function (data) {
              $scope.data = data.response.venues;
              alert('SUCCESS!');
            })
            .finally(function () {
              // Stop the ion-refresher from spinning
              $scope.$broadcast('scroll.refreshComplete');
            });
        });
      });
    };


    $ionicModal.fromTemplateUrl('my-modal.html', {
      scope: $scope,
      animation: 'slide-in-up'
    }).then(function(modal) {
      $scope.modal = modal;
    });



    $scope.openModal = function(x,y) {
      gx=x;
      gy=y;

      $window.navigator.geolocation.getCurrentPosition(function(position) {
        $scope.$apply(function () {
          lat = position.coords.latitude;
          lng = position.coords.longitude;



          newmap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 16);


          L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
            maxZoom: 18,
            id: 'sepehr3b.036hdd0e',
            accessToken: 'pk.eyJ1Ijoic2VwZWhyM2IiLCJhIjoiY2luenlra3ZqMDB0OXZmbTI0cjZ3bTNrbiJ9.At7ppxkLHjokYhH1N0LoAQ'
          }).addTo(newmap);

          var mark = L.icon({
            iconUrl: 'img/mark.png',
            iconAnchor:   [34, 108]

          });

          L.marker([position.coords.latitude, position.coords.longitude], {icon: mark}).addTo(newmap);

          L.marker([gx,gy], {icon: mark}).addTo(newmap);

          L.Routing.control({
            waypoints: [
              L.latLng(position.coords.latitude, position.coords.longitude),
              L.latLng(gx,gy)
            ]
          }).addTo(newmap);


          $scope.closeModal = function() {
            newmap.remove();
            $scope.modal.remove();
          };

        })
      })


      $scope.modal.show();

    };

    $scope.closeModal = function() {
      newmap.remove();
      $scope.modal.remove();
    };

  })




  .controller('mapCtrl', function($scope,$window,$ionicModal,$http) {





  $window.navigator.geolocation.getCurrentPosition(function(position) {
    $scope.$apply(function () {
      lat = position.coords.latitude;
      lng = position.coords.longitude;



  var mymap = L.map('mapid').setView([position.coords.latitude, position.coords.longitude], 16);


      L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    maxZoom: 18,
    id: 'sepehr3b.036hdd0e',
    accessToken: 'pk.eyJ1Ijoic2VwZWhyM2IiLCJhIjoiY2luenlra3ZqMDB0OXZmbTI0cjZ3bTNrbiJ9.At7ppxkLHjokYhH1N0LoAQ'
  }).addTo(mymap);

      var mark = L.icon({
        iconUrl: 'img/mark.png',
        iconAnchor:   [34, 108]

      });

      L.marker([position.coords.latitude, position.coords.longitude], {icon: mark}).addTo(mymap);





    })
  })

})


.controller('aboutCtrl', function($scope) {

  })

  .controller('GeoCtrl', function($scope,$window) {
    $window.navigator.geolocation.getCurrentPosition(function(position){
      $scope.$apply(function(){
        $scope.lat = position.coords.latitude;
        $scope.lng = position.coords.longitude;
      })
    })
  });






