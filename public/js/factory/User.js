/**
 * Created by Basil on 1/8/2015.
 */
angular.module("main")
.factory("User",[
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
