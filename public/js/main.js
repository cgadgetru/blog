angular.module("main",['ngRoute'])
.config(function($interpolateProvider, $routeProvider, $locationProvider) {
    'use strict';
    $interpolateProvider.startSymbol('{$');
    $interpolateProvider.endSymbol('$}');
    $routeProvider
    .when('/', {
        templateUrl: 'partial/posts-list.html',
        controller: 'PostListCtrl'
    }).when('/login', {
        templateUrl: 'partial/login.html',
        controller: 'LoginCtrl'
    }).when('/post/:permalink', {
        templateUrl: 'partial/single-post.html',
        controller: 'PostCtrl'
    }).when('/singup', {
            templateUrl: 'partial/singup.html',
            controller: 'SingupCtrl'
    }).when('/new_post', {
        templateUrl: 'partial/new-post.html',
        controller: 'NewPostCtrl'
    }).when('/tag/:tag', {
        templateUrl: 'partial/posts-list-by-tag.html',
        controller: 'PostByTagCtrl'
    });

    // configure html5 to get links working on jsfiddle
//    $locationProvider.html5Mode(true);
});
