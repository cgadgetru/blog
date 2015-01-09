/**
 * Created by Basil on 1/8/2015.
 */
angular.module("main")
    .controller("PostCtrl", ['$scope', '$location','$routeParams','Posts',
        function ($scope, $location, $routeParams, Posts) {
        $scope.params = $routeParams;

        $scope.get_post = function () {
            Posts.getPost($scope.params.permalink, function (post) {
                $scope.view_type = "single-post";
                $scope.single_post = post;
            }, function (err) {
                console.error("error", err);
            })
        };
        $scope.add_comment = function(permalink,comment){
            var self = this;
            Posts.addComment(permalink,comment,function(post){
                $scope.view_type = "single-post";
                $scope.comments_show = true;
                self.comment = {};
                $scope.single_post = post;
            },function(err){
                console.error("error",err);
            });
        };
    }]);