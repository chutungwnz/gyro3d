var scene = require('../scene.js').scene;

exports.scene = function() {
  return {
    restrict: 'EA',
    scope: {
      data: '=' // bi-directional data-binding
    },
      // directive code
    link: function(scope, element, attrs) {
      var sceneObj = scene.init(element);
      sceneObj.init();
      
      scope.$parent.$watch('data', function(newData) {
        scope.render(newData);
      }, true);

      scope.render = function(data) {
        if (data) {
          sceneObj.setCubeRotation(data.x, data.y, data.z);
        }
      };
      
    }
  };
};