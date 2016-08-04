
import angular from 'angular';
import uiRouter from 'angular-ui-router';

//import uiMobile from 'mobile-angular-ui';

import mainService from './main/mainService.js';
import MainCtrl from './main/mainCtrl.js';
import appConfig from './config/config.js';

export default angular.module('app', [uiRouter, mainService])
    .controller('MainCtrl', MainCtrl)
    .config(appConfig)
    .name;