
import angular from 'angular';
import uiRouter from 'angular-ui-router';

//import uiMobile from 'mobile-angular-ui';

import MainCtrl from './main/mainCtrl.js';
import appConfig from './config/config.js';

angular.module('app', [uiRouter])
    .controller('MainCtrl', MainCtrl)
    .config(appConfig);