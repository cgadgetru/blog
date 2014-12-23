var app = angular.module("main",[]);
app.config(function($interpolateProvider) {
    'use strict';
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
});
app.factory("Posts",[

    '$http',

    function ($http) {
        'use strict';
        return{
            getList: function (callback, error) {
                $http.get('/posts').success(function (data) {
                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            },
            getPost:function (permalink, callback, error) {
                $http.get('/post/'+permalink).success(function (data) {
                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            },
            addComment:function(permalink,comment,callback,error){ ///newcomment
                $http.post('/newcomment/',{comment:comment,permalink:permalink}).success(function (data) {

                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            }
        };
    }]);

app.controller("postsListCtrl",['$scope','Posts',function($scope,Posts){

    $scope.get_list = function(){
        $scope.view_type = "posts-list";
        $scope.comments_show = false;
        Posts.getList(function (posts) {
            $scope.posts = posts;
        }, function (data) {
            $scope.error_message = data.error || 'uncaught exception';
        });
    };
    $scope.get_post = function(permalink){
        Posts.getPost(permalink,function(post){
            $scope.view_type = "single-post";
            $scope.single_post = post;
        },function(err){
            $scope.error_message = data.error || 'uncaught exception';
        })
    };
    $scope.add_comment = function(permalink,comment){
        Posts.addComment(permalink,comment,function(post){
            $scope.view_type = "single-post";
            $scope.single_post = post;
        },function(err){
            $scope.error_message = data.error || 'uncaught exception';
        });
    };
}]);


