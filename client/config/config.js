function config($stateProvider, $urlRouterProvider, $locationProvider) {
    $locationProvider.html5Mode(true);

    $urlRouterProvider.otherwise("/");

    $stateProvider
        .state('main', {
            url: '/',
            template: require('html!../main/main.html'),
            controller: 'MainCtrl',
            controllerAs: 'vm',
            title: ''
        });
}

export default ['$stateProvider', '$urlRouterProvider', '$locationProvider', config];