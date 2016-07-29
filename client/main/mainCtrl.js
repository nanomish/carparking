MainCtrl.$inject = ['$scope', '$stateParams'];

function MainCtrl($scope, $stateParams) {
    $scope.who = 'carpar';
    var vm = this;
    $scope.signid = $stateParams.signid;

    vm.sometext = 'this is the text';
    if ($scope.signid === 'edmont001') {
        $scope.signComment = 'You can park here now for free';
    } else if ($scope.signid === 'edmont002') {
        $scope.signComment = 'Currently you cannot park';

    }
}

export default MainCtrl;