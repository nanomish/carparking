MainCtrl.$inject = ['$scope', '$stateParams'];

function MainCtrl($scope, $stateParams) {
    $scope.who = 'carpar';
    var vm = this;
    $scope.signid = $stateParams.signid;

    console.log('Main - running');
    vm.sometext = 'this is the text';
    if ($scope.signid === 'edmont001') {
        $scope.signComment = 'You can park here now for free';
        console.log('Main - signid:', $scope.signid);
    } else if ($scope.signid === 'edmont002') {
        $scope.signComment = 'Currently you cannot park';
        console.log('Main - signid: ', $scope.signid);
    }
}

export default MainCtrl;