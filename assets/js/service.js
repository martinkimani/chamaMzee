
angular.module('services', ['ngResource'])
    .factory('HighlightList', function ($resource) {
        return $resource('games/highlights', {}, {
            query: {method: 'GET', isArray: true}
        });
    }).factory('ResultResp', function ($resource) {
        return $resource('games/result', {}, {
            query: {method: 'GET', isArray: true}
        });
    });