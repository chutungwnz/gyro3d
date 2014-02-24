exports.sceneCtrl = function ($scope, mySocket) {
  
  mySocket.on('data', function (data) {
    //$scope.config = configService.getConfig();
    $scope.data = data;

  });
};