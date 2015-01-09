/**
 * Created by Basil on 1/8/2015.
 */
angular.module("main")
.factory("Posts",[

    '$http',

    function ($http) {
        'use strict';
        return{
            getList: function (callback, error) {
                $http.get('/posts').success(function (data) {
                    callback(data.posts,data.username);
                }).error(function (data) {
                    error(data);
                });
            },
            getPostByTag:function (tag, callback, error) {
                $http.get('/tag/' + tag).success(function (data) {
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
