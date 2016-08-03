import _ from 'underscore';
import moment from 'moment';

MainCtrl.$inject = ['$scope', '$stateParams'];

function MainCtrl($scope, $stateParams) {
    var vm = this;
    vm.scannedSign = {};
    vm.dateNow = moment().format('lll');
    vm.timePrefix = '';
    vm.showPicture = showPicture;
    $scope.modal2 = false;

    init();

    vm.signid = $stateParams.signid;
    vm.signComment = '';

    console.log('Main - running');
    console.log('Main - signid:', vm.signid);

    vm.scannedSign = _.findWhere(vm.signs, {id: vm.signid});
    if (vm.scannedSign) {
        vm.signPicture = vm.scannedSign.pictureUrl;
        vm.signComment = vm.scannedSign.signComment;
    } else {
        vm.signPicture = '';
        vm.signComment = 'No Info!';
    }
    //console.log('vm.scannedSign: ', vm.scannedSign);

    function showPicture() {
        $scope.modal2 = true;
        console.log('Main - showPicture()');
    }

    function init() {
        vm.signs = [
            {
                id: 'edmont001',
                pictureUrl: 'images/sign001.png',
                signComment: 'החניה מותרת לתושבי אזור 30 בלבד',
                parking: {
                    Sunday: {

                    }
                }
            },
            {
                id: 'edmont002',
                pictureUrl: 'images/sign002.png',
                signComment: 'החניה מותרת בתשלום'
            }
        ];
    }
}

export default MainCtrl;