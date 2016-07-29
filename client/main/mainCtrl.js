MainCtrl.$inject = ['$stateParams'];

function MainCtrl($stateParams) {
    var vm = this;
    vm.signid = $stateParams.signid;
    vm.signComment = '';

    console.log('Main - running');
    console.log('Main - signid:', vm.signid);
    if (vm.signid === 'edmont001') {
        vm.signComment = 'You can park here now for free';
    } else if (vm.signid === 'edmont002') {
        vm.signComment = 'Currently you cannot park';
    }
}

export default MainCtrl;