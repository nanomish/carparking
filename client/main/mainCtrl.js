
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
    if (!vm.scannedSign) {
        vm.signPicture = '';
        vm.signComment = 'No Info!';
    }
    console.log('vm.scannedSign: ', vm.scannedSign);
    if (vm.signid === 'edmont001') {
        vm.signComment = 'You can park here now for free';
        vm.signPicture = vm.signs[0].pictureUrl;
    } else if (vm.signid === 'edmont002') {
        vm.signComment = 'Currently you cannot park';
        vm.signPicture = vm.signs[1].pictureUrl;
    }

    function init() {
        vm.signs = [
            {
                id: 'edmont001',
                pictureUrl: 'images/sign001.png',
                signComment: 'You can park here now for free'
            },
            {
                id: 'edmont002',
                pictureUrl: 'images/sign002.png',
                signComment: 'Currently you cannot park'
            }
        ];
    }
}

export default MainCtrl;