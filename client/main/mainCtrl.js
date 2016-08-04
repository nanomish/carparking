import _ from 'underscore';
import moment from 'moment';

MainCtrl.$inject = ['$scope', '$stateParams'];

function MainCtrl($scope, $stateParams) {
    var vm = this;
    vm.scannedSign = {};
    vm.dateNow = moment().locale('he').format('LLLL');
    vm.timePrefix = '';
    vm.showPicture = false;
    vm.who = 'all';
    $scope.modal2 = false;

    $scope.$watch('vm.who', calculateResults);

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
        if (_.contains(state.who, forWhom)) {
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

    vm.scannedSign = _.findWhere(vm.signs, {id: vm.signid});
    /*vm.areasCheckBoxLabelNumbers = vm.scannedSign.areas.join(',');
    vm.areasCheckBoxLabel = vm.areasCheckBoxLabelNumbers + ' תושב אזור ';*/

    function calculateResults() {
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
                id: 'edmont001',
                pictureUrl: 'images/sign001.png',
                location: {},
                areas: [
                    {
                        label: 'תושב אזור 30',
                        data: 'area#30'
                    },
                    /*{
                        label: 'תושב תל אביב',
                        data: all
                    },*/
                    {
                        label: 'אינני תושב תל אביב',
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
                            end: '09:00',
                            days: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
                            state: [
                                {
                                    who: 'all',
                                    parkingIs: 'אין החניה'
                                },
                                {
                                    who: 'area#30',
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
                                    who: 'all',
                                    parkingIs: 'החניה בתשלום'
                                },
                                {
                                    who: 'area#all',
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
                                    who: 'all',
                                    parkingIs: 'החניה בתשלום'
                                },
                                {
                                    who: 'area#all',
                                    parkingIs: 'החניה בחינם'
                                }
                            ]
                        }
                    ]
            },
            {
                id: 'edmont002',
                pictureUrl: 'images/sign002.png',
                location: {},
                defaultSignComment: 'החניה מותרת בתשלום'
            }
        ];
    }
}

export default MainCtrl;