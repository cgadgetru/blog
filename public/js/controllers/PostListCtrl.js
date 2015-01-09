angular.module("main")
    .controller("PostListCtrl", ['$scope', '$location', '$rootScope', 'Posts',
        function ($scope, $location, $rootScope, Posts) {
        $scope.get_list = function () {
            $scope.view_type = "posts-list";
            $scope.comments_show = false;
            Posts.getList(function (posts,username) {
                $scope.posts = posts;
                if(username){
                    $rootScope.$broadcast("login",username);
                }
                console.log("username 111",username);
            }, function (err) {
                console.error("error", err);
            });

        };
    }]);