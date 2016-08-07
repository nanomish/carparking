function config($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

    console.log('running config');

    $stateProvider
        .state('main', {
            url: '/?signid=',
            template: require('html!../main/main.html'),
            controller: 'MainCtrl',
            controllerAs: 'vm',
            title: ''
        })
    .state('admin', {
            url: '/admin?a',
            template: require('html!../admin/admin.html'),
            controller: 'AdminCtrl',
            controllerAs: 'vm',
            resolve: {
                loggedin: checkLoggedIn
            }
        })
    .state('login', {
            url: '/login',
            template: require('html!../login/login.html'),
            controller: 'LoginCtrl',
            controllerAs: 'vm'
        });

    console.log('config - interceptor');
    $httpProvider.interceptors.push(function ($q, $location) {
        return {
            response: function (response) {
                // do something on success
                console.log('config - interceptor success');
                return response;
            },
            responseError: function (response) {
                if (response.status === 401) {
                    console.log('config - interceptor returns 401');
                    $location.url('/login');
                }
                return $q.reject(response);
            }
        };
    }); //- See more at: https://vickev.com/#!/article/authentication-in-single-page-applications-node-js-passportjs-angularjs

    function checkLoggedIn($q, $http, $location, $rootScope) {
            // Initialize a new promise
            var deferred = $q.defer();
            // Make an AJAX call to check if the user is logged in
            console.log('checkLoggedIn - ');
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