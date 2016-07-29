
import angular from 'angular';
import uiRouter from 'angular-ui-router';

import MainCtrl from './main/mainCtrl.js';
import appConfig from './config/config.js';

//var angular = require('angular');

angular.module('app', [uiRouter])
    .controller('MainCtrl', MainCtrl)
    .config(appConfig);