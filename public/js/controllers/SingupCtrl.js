/**
 * Created by Basil on 1/8/2015.
 */
angular.module("main")
.controller("SingupCtrl", ['$scope', '$location', 'User', function ($scope, $location, User) {
    $scope.singup_error = '';
    $scope.signup = function (user) {
        if (user.password != user.verify) {
            this.singupForm.$valid = false;
            $scope.singup_error = 'passwords do not match';
        } else {
            User.signup(user, function (errors) {
                console.log("erorrs", errors);

                if (errors['username_error']) {
                    $scope.singup_error = errors['username_error'];
                } else if (errors['password_error']) {
                    $scope.singup_error = errors['password_error'];
                } else if (errors['email_error']) {
                    $scope.singup_error = errors['email_error'];
                } else {
                    $location.path("/");
                }
            }, function (err) {
                console.error("error", err);
            })
        }

    };
}]);
