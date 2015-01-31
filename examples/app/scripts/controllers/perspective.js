'use strict';

angular.module('integrationApp')
  .controller('PerspectiveCtrl', function ($scope, $famous) {
    var Transitionable = $famous['famous/transitions/Transitionable'];
    var Transform = $famous['famous/core/Transform'];

    $scope.perspective = 1000;

    var _modPerspective = new Transitionable(10);
    $scope.modPerspective = function(){
      return _modPerspective.get();
    }
    _modPerspective.set(10000, {duration: 10000, curve: 'linear'});


    var _rotateY = new Transitionable(0);
    $scope.getRotate = function(){
      return [0, _rotateY.get(), 0];
    }

    $scope.transform = new Transitionable(
      Transform.multiply(
        Transform.translate(0, 0, 0), 
        Transform.rotateY(Math.PI / 3)
      )
    ); 

    _rotateY.set(2 * Math.PI, {duration: 10000, curve: 'linear'});
  });
