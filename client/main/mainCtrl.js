MainCtrl.$inject = ['$scope', '$stateParams'];

function MainCtrl($scope, $stateParams) {
    $scope.who = 'carpar';
    $scope.signid = $stateParams.signid;
}

export default MainCtrl;