//this is where you would use $http or $resource to do your API calls to the Node backend from your Angular frontend


angular.module('NerdService', []).factory('Nerd', ['$http', function($http) {

    return {
        //call to get all nerds
        get: function () {
            return $http.get('/api/nerds');
        },

        //these will work when more API routes are defined on the Node side


        //call to POST and create new nerd

        create: function(nerdData) {
            return $http.post('/api/nerds', nerdData);
        },

        //call to DELETE a nerd
        delete: function(id) {
            return $http.delete('/api/nerds/' + id);
        }

    }

}]);

