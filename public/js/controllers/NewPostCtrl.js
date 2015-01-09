/**
 * Created by Basil on 1/8/2015.
 */
angular.module("main")
    .controller("NewPostCtrl", ['$scope', '$location', 'Posts',
        function ($scope, $location, Posts) {
            $scope.add_new_post = function (post) {
                Posts.addNewPost(post, function (post) {
                    console.log("post", post);
                    $scope.single_post = post;
                    $location.path("/");
                }, function (err) {
                    console.error("error", err);
                });
            };
        }]);