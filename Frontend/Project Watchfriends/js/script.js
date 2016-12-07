/**
 * Created by michi on 5/12/2016.
 */
var app = angular.module('watchfriends', []);
var posters = [];
app.controller('MyCtrl', function($scope, $http) {
    var base = 'http://api.themoviedb.org/3';
    var service = '/tv/popular';
    var apiKey = '1bf0e61160c43c646a87f430a34ecd4b';
    var callback = 'JSON_CALLBACK';
    var url = base + service + '?api_key=' + apiKey + '&callback=' + callback;

    $scope.result = 'requesting...';

    $http.jsonp(url).then(function(data, status) {

        $scope.result = JSON.stringify(data);
        console.log(data);

      /*  for(var i=0; i< (data.results).length; i++){
            var poster = data.results[i].poster_path;
            posters.push(poster);
            console.log(posters);
        }*/
    },function(data, status) {
        $scope.result = 'Maybe you missed your API key?\n\n' + JSON.stringify(data);
    });
});


