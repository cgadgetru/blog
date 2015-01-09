/**
 * Created by Basil on 1/8/2015.
 */
angular.module("main")
.controller("LoginCtrl",['$scope','$location','$rootScope','User',function($scope, $location, $rootScope, User){
    $scope.singup_error = '';
    $scope.login_error = '';
    console.log("rootscope",$rootScope);
        $scope.login = function(user){

        User.login(user,function (user) {
            if(user.login_error){
                $scope.login_error = user.login_error;
            }else{
                console.log('user',user.username);
                $rootScope.$broadcast("login",user.username);
                $location.path("/");
            }

        }, function (err) {
            console.error("error",err);
        })
    };
}]);
