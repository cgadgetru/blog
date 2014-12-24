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
            getPost: function (permalink, callback, error) {
                $http.get('/post/' + permalink).success(function (data) {
                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            },
            addComment: function (permalink, comment, callback, error) { ///newcomment
                $http.post('/newcomment/', {comment: comment, permalink: permalink}).success(function (data) {

                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            },
            addNewPost: function (post, callback, error) {
                $http.post('/newpost', post).success(function (data) {
                    console.log(post);
                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            }
        }
    }]);
app.factory("User",[
    '$http',

    function ($http) {
        'use strict';
        return{
            login: function (user, callback, error) {
                $http.post('/login',user).success(function (data) {

                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            },
            signup:function (user, callback, error) {
                $http.post('/signup',user).success(function (data) {
                    callback(data);
                }).error(function (data) {
                    error(data);
                });
            }

        }
    }

]);

app.controller("mainCtrl",['$scope','Posts','User',function($scope,Posts,User){
    $scope.singup_error = '';
    $scope.login_error = '';
    $scope.login = function(user){
        User.login(user,function (error) {
            if(error.login_error){
                $scope.login_error = error.login_error;
            }else{
                window.location.href = "/";
            }

        }, function (data) {
            $scope.error_message = data.error || 'uncaught exception';
        })
    };
    $scope.signup = function(user){
        if(user.password != user.verify){
            this.singupForm.$valid = false;
            $scope.singup_error = 'passwords do not match';
        }else{
            User.signup(user,function (errors) {
                console.log("erorrs",errors);

                if(errors['username_error']){
                    $scope.singup_error = errors['username_error'];
                }else if(errors['password_error']){
                    $scope.singup_error = errors['password_error'];
                }else if(errors['email_error']){
                    $scope.singup_error = errors['email_error'];
                }else{
                    window.location.href = "/";
                }
            }, function (data) {
                $scope.error_message = data.error || 'uncaught exception';
            })
        }

    };

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
    $scope.add_new_post = function(post){
        Posts.addNewPost(post,function(post){
            $scope.view_type = "single-post";
            $scope.single_post = post;
        },function(err){
            $scope.error_message = data.error || 'uncaught exception';
        });
    };
}]);