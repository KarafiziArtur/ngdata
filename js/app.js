var app = angular.module('ngData', [
    'ui.router',
    'ngAnimate',
    'firebase'
]);

app.constant('FIREBASE_URL', 'https://angular-data-app.firebaseio.com/');

app.run(['$rootScope', '$state', firstRun]);

function firstRun($rootScope, $state) {
    $rootScope.$on('$stateChangeError',
        function(event, toState, toParams, fromState, fromParams, error) {
            if (error === 'AUTH_REQUIRED') {
                event.preventDefault();
                $state.go('login');
            }
        });
}

app.config(['$urlRouterProvider', '$stateProvider', configurateRoutes]);

function configurateRoutes($urlRouterProvider, $stateProvider) {
    $urlRouterProvider.otherwise('/meetings');
    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'views/login.tpl.html',
            controller: 'RegistrationController as rc'
        })
        .state('register', {
            url: '/register',
            templateUrl: 'views/register.tpl.html',
            controller: 'RegistrationController as rc'
        })
        .state('checkins', {
            url: '/checkins/:uId/:mId',
            templateUrl: 'views/checkins.tpl.html',
            controller: 'CheckinsController as cc'
        })
        .state('checkinslist', {
            url: '/checkins/:uId/:mId/checkinsList',
            templateUrl: 'views/checkinslist.tpl.html',
            controller: 'CheckinsController as cc'
        })
        .state('meetings', {
            url: '/meetings',
            templateUrl: 'views/meetings.tpl.html',
            controller: 'MeetingsController as mc',
            resolve: {
                currentAuth: function(authFactory) {
                    return authFactory.requireAuth();
                }
            }
        });
}