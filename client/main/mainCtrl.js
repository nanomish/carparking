
import _ from 'underscore';
MainCtrl.$inject = ['$stateParams'];

function MainCtrl($stateParams) {
    var vm = this;
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