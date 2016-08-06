var phonecatApp = angular.module('phonecatApp', [
'ngRoute',
'phonecatAppControllers'
]);

phonecatApp.config(['$routeProvider',
  function($routeProvider) {
    $routeProvider.
      when('/', {
        templateUrl: 'partials/frontPage.html',
        controller: 'HeadListCtrl'
      }).
      when('/mobileLists', {
        templateUrl: 'partials/secondPage.html',
        controller: 'AllMobileListCtrl'
      }).
      when('/signUp', {
        templateUrl: 'partials/signUp.html',
        controller: 'singUpValidation'
      }).
      when('/logIn', {
        templateUrl: 'partials/logIn.html',
        controller: 'logInValidation'
      }).
      when('/account', {
        templateUrl: 'partials/account.html',
        controller: ''
      }).
      otherwise({
        redirectTo: '/'
      });
  }]);