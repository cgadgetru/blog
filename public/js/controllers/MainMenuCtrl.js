angular.module("main")
    .controller("MainMenuCtrl", ['$scope', '$location','$rootScope','User',
        function ($scope, $location, $rootScope, User) {
            $scope.username = "";
            console.log("rootscpe",$rootScope);
            $rootScope.$on("login",function(ev,username){
                $scope.username = username;
                console.log("user",username,"login");
            });
        }]);
