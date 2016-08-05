function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            url: '/?signid',
            template: require('html!../main/main.html'),
            controller: 'MainCtrl',
            controllerAs: 'vm',
            title: ''
        })
    .state('admin', {
            url: '/admin',
            template: require('html!../admnin/admin.html'),
            controller: 'AdminCtrl',
            controllerAs: 'vm'
        });
    /*
     .when('/admin', { templateUrl: 'views/admin.html', controller: 'AdminCtrl', resolve: { loggedin: checkLoggedin } }) .when('/login', { templateUrl: 'views/login.html', controller: 'LoginCtrl' }) - See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

     */

    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            response: function (response) {
                // do something on success
                return response;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    $location.url('/login');
                }
                return $q.reject(response);
            }
        };
    }); //- See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

    var checkLoggedin = function($q, $timeout, $http, $location, $rootScope) {
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            $http.get('/loggedin').success(function(user) {
            // Authenticated
            if (user !== '0') {
                deferred.resolve();
            }
            // Not Authenticated
            else {
                $rootScope.message = 'You need to log in.';
                deferred.reject();
                $location.url('/login');
            }
            });
        return deferred.promise;
    }; //- See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs
}
export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', config];