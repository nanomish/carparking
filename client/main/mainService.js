'use strict';

import angular from 'angular';

function mainService() {

    function init() {
        console.log('mainService init - is loaded');
    }

}

export default mainService;
/*

export default angular.module('app')
    .service('mainService', mainService)
    .name;*/
