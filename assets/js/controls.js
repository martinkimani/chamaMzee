
var url = './api/';
appmvc.service('CacheMem', function($cacheFactory) {
    return $cacheFactory('Cache',{
//        maxAge: 60000,
//        deleteOnExpire: 'aggressive',
//        recycleFreq: 30000
    });
});

appmvc.controller('loginCtrl', function loginCtrl($scope, $location, $http, $store) {  
    $scope.login = function (user) {
        var hash = calcMD5(user.password);
        console.log(user.username);
         
//        var Data = {usrnm:user.username, pswd: hash};
//         
//        $http.post(url+'login', Data).success(function(data){                
//            //if(data.isLogged){
//                $location.path('/home');
//            //}else{
//                //$scope.error_message = data.description;
//           // }
//        });              
    };
});

appmvc.controller('homeCtrl')
