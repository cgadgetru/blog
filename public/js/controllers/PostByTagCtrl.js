/**
 * Created by Basil on 1/9/2015.
 */
angular.module("main")
    .controller("PostByTagCtrl", ['$scope', '$location', '$rootScope', '$routeParams', 'Posts',
        function ($scope, $location, $rootScope, $routeParams, Posts) {
            $scope.params = $routeParams;
            $scope.get_list = function (tag) {
                Posts.getPostByTag($scope.params.tag, function (posts) {
                    $scope.comments_show = false;
                    $scope.posts = posts;
                }, function (err) {
                    console.error("error", err);
                })
            };
        }]);