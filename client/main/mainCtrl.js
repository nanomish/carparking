import _ from 'underscore';
import moment from 'moment';
//import db from '../config/env.js';

MainCtrl.$inject = ['$scope', '$stateParams'];

function MainCtrl($scope, $stateParams) {
    var vm = this;
    vm.scannedSign = {};
    vm.dateNow = moment().locale('he').format('LLLL');
    vm.timePrefix = '';
    vm.showPicture = false;
    $scope.modal2 = false;

    $scope.$watch('vm.who', calculateResults);

    vm.who = 'all';
    //calculateResults();

    init();

    vm.signid = $stateParams.signid;
    vm.signComment = '';

    console.log('Main - running');
    console.log('Main - signid:', vm.signid);

    var weekdayNow = moment().format('dddd');
    var dateNow = moment().format('YYYY-MM-DD');
    // unless checked user with special area number or Tel Aviv resident

    console.log('weekday: ', weekdayNow);

    function createTimeDate(hour) {
        var dateNow = moment().format('YYYY-MM-DD');
        return moment(dateNow + ' ' + hour);
    }

    function getParkingStateByIssuer(forWhom, state) {
        console.log('getParkingStateByIssuer - state: ', state);
        console.log('getParkingStateByIssuer - forWhom: ', forWhom);
        console.log('getParkingStateByIssuer - looking in: ', state.who);
        if (_.contains(state.who, forWhom)) {
            console.log('getParkingStateByIssuer - found state: ', state);
            return state;
        }
    }

    function getParkingState(who) {
        var forWhom = who || 'all';
        var timeNow = moment().format('YYYY-MM-DD HH:mm');
        var parkingState = {};

        console.log('time: ', timeNow);

        var parkingObjectsArray = _.filter(vm.scannedSign.parking, function(p) {
            if (_.contains(p.days, weekdayNow) &&
                createTimeDate(p.start).isBefore(timeNow) &&
                createTimeDate(p.end).isAfter(timeNow)) {
                return p;
            }
        });
        if (parkingObjectsArray) {
            _.each(parkingObjectsArray, function(po) {
                parkingState = _.find(po.state, getParkingStateByIssuer.bind(null, forWhom));
            });
        } else {
            //No information available for this time.
            parkingState = {};
        }

        console.log('parkingObjectsArray: ', parkingObjectsArray);
        console.log('parkingState: ', parkingState);
        return parkingState;
    }

    vm.scannedSign = _.findWhere(vm.signs, {signid: vm.signid});
    /*vm.areasCheckBoxLabelNumbers = vm.scannedSign.areas.join(',');
    vm.areasCheckBoxLabel = vm.areasCheckBoxLabelNumbers + ' תושב אזור ';*/

    function calculateResults() {
        console.log('getting result for ', vm.who);
        var parkingState = getParkingState(vm.who);

        console.log('result: ', parkingState.parkingIs);
        if (vm.scannedSign) {
            vm.signPicture = vm.scannedSign.pictureUrl;
            vm.signComment = parkingState.parkingIs || vm.scannedSign.signComment;
        } else {
            vm.signPicture = '';
            vm.signComment = 'No Info!';
        }
        //console.log('vm.scannedSign: ', vm.scannedSign);
    }

    function init() {
        vm.signs = [
            {
                signid: 'edmont001',
                pictureUrl: 'https://s3-eu-west-1.amazonaws.com/carparkingsigns/sign001.png',
                location: {},
                status: {
                    date: {},
                    is: ''
                },
                areas: [
                    {
                        label: 'תושב אזור 30',
                        data: 'area#30'
                    },
                    /*{
                        label: 'תושב תל אביב',
                        data: 'all'
                    },*/
                    {
                        label: 'אני לא תושב תל אביב',
                        data: 'all'
                    }
                ],
                defaultSignComment: 'החניה מותרת לתושבי אזור 30 בלבד',
                parking:
                    [
                        {
                            start: '09:00',
                            end: '17:00',
                            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                            state: [
                                {
                                    who: ['all'],
                                    parkingIs: 'החניה בתשלום'
                                },
                                {
                                    who: ['area#30'],
                                    parkingIs: 'החניה בחינם'
                                }
                            ]
                        },
                        {
                            start: '17:00',
                            end: '23:59',
                            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            state: [
                                {
                                    who: ['all'],
                                    parkingIs: 'אין החניה'
                                },
                                {
                                    who: ['area#30'],
                                    parkingIs: 'החניה בחינם'
                                }
                            ]
                        },
                        {
                            start: '00:01',
                            end: '09:00',
                            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            state: [
                                {
                                    who: ['all'],
                                    parkingIs: 'אין החניה'
                                },
                                {
                                    who: ['area#30'],
                                    parkingIs: 'החניה בחינם'
                                }
                            ]
                        },
                        {
                            start: '09:00',
                            end: '13:00',
                            days: ['Friday', 'Saturday', 'Holidays'],
                            state: [
                                {
                                    who: ['all'],
                                    parkingIs: 'החניה בתשלום'
                                },
                                {
                                    who: ['area#30'],
                                    parkingIs: 'החניה בחינם'
                                }
                            ]
                        },
                        {
                            start: '09:00',
                            end: '13:00',
                            days: ['Friday', 'Saturday', 'Holidays'],
                            state: [
                                {
                                    who: ['all'],
                                    parkingIs: 'החניה בתשלום'
                                },
                                {
                                    who: ['area#30'],
                                    parkingIs: 'החניה בחינם'
                                }
                            ]
                        }
                    ]
            },
            {
                signid: 'edmont002',
                pictureUrl: 'https://s3-eu-west-1.amazonaws.com/carparkingsigns/sign002.png',
                location: {},
                defaultSignComment: 'החניה מותרת בתשלום',
                areas:[],
                parking: [
                    {
                        start: '00:01',
                        end: '9:00',
                        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                        state: [
                            {
                                who: ['all'],
                                parkingIs: 'החניה בחינם'
                            }
                        ]
                    },
                    {
                        start: '09:00',
                        end: '19:00',
                        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                        state: [
                            {
                                who: ['all'],
                                parkingIs: 'החניה בתשלום'
                            }
                        ]
                    },
                    {
                        start: '19:00',
                        end: '23:59',
                        days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday'],
                        state: [
                            {
                                who: ['all'],
                                parkingIs: 'החניה בחינם'
                            }
                        ]
                    },
                    {
                        start: '09:00',
                        end: '13:00',
                        days: ['Friday'],
                        state: [
                            {
                                who: ['all'],
                                parkingIs: 'החניה בתשלום'
                            }
                        ]
                    },
                    {
                        start: '13:00',
                        end: '23:59',
                        days: ['Friday'],
                        state: [
                            {
                                who: ['all'],
                                parkingIs: 'החניה בחינם'
                            }
                        ]
                    },
                    {
                        start: '00:01',
                        end: '23:59',
                        days: ['Saturday'],
                        state: [
                            {
                                who: ['all'],
                                parkingIs: 'החניה בחינם'
                            }
                        ]
                    }
                ]
            }
        ];
    }
}

export default MainCtrl;