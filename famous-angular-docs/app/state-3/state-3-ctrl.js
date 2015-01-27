angular.module('famous-angular')

.controller('State3Ctrl', function($rootScope, $scope, $state, $interval, $famous, $timeline, stateTransitions, $media) {
  var Transform = $famous['famous/core/Transform'];

  var Transitionable = $famous['famous/transitions/Transitionable'];
  var Easing = $famous['famous/transitions/Easing'];

  var t = new Transitionable(0);
  $scope.t = t;

  var tile = {
    width: 300,
    height: 115,
    margin: {
      left: 10,
      bottom: 10
    },
    countPerColumn: 4,
    columnCount: 2
  };
  $scope.tile = tile;

  var tileGrid = {
    margin: {
      left: 30
    }
  };
  $scope.tileGrid = tileGrid;

/*--------------------------------------------------------------*/

  $scope.gravity = {
    translate: $timeline([
      [3, [0, 0, -100]],
      [3.5, [0, 0, 0]],
      [4, [0, 0, 100]],
    ]),
    opacity: $timeline([
      [3, 0],
      [3.3, 1],
      [3.5, 1],
      [3.7, 1],
      [4, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $scope.enter = function($done) {
    stateTransitions.enter(t, function() {
      playAnimation();
      $done();
    });
  };

  function playAnimation() {
    var repeatAutoplay = $interval(function() {
      if ($scope.data.repeatCount + 1 >= 9) {
        $interval.cancel(repeatAutoplay);
        return;
      }
      $scope.data.repeatCount++;
    }, 100);
  }

  $scope.leave = function($done) {
    stateTransitions.leave(t, function() {
      $done();
    });
  };

  $scope.entireView = {
    translate: $timeline([
      [0, [0, 0, 0]],
      [1, [0, 0, 0], Easing.inQuart],
      [2, [0, 0, 150]],
    ]),
    opacity: $timeline([
      [0, 0],
      [0.3, 1],
      [1, 1],
      [2, 0],
    ])
  };

/*--------------------------------------------------------------*/

  $media.$sheet('State3Sheet', {

    xs: {
      '#left-column': {
        transform: function() {
          var translate = $timeline([
            [0, [40, 920, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        }
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [50, 250, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#code': {
        opacity: function() {
          return 0;
        },
      }
    },


    sm: {
      '#left-column': {
        transform: function() {
          var translate = $timeline([
            [0, [250, 150, 0]],
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#right-column': {
        transform: function() {
          var translate = $timeline([
            [0, [980, 170, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
      },
      '#code': {
        transform: function() {
          var translate = $timeline([
            [0.2, [0, 220, 0], Easing.inOutQuart],
            [0.6, [0, 170, 0]]
          ])(t.get());
          return Transform.translate.apply(this, translate);
        },
        opacity: function() {
          return $timeline([
            [0.2, 0, Easing.inOutQuart],
            [0.6, 1]
          ])(t.get());
        },
      }
    }

  });

  $scope.faAppHeight = function() {
    var totalHeight = tile.height + tile.margin.bottom;
    return (totalHeight * tile.countPerColumn);
  };

  $scope.heading = {
    translate: $timeline([
      [0, [0, 0, -150], Easing.inOutQuart],
      [0.4, [0, 0, 0]]
    ]),
    opacity: $timeline([
      [0, 0, Easing.inOutQuart],
      [0.4, 1]
    ])
  };

  $scope.repeatSlider = {
    width: (tile.width * tile.columnCount) + tile.margin.left,
    height: 60,
    translate: function() {
      var totalTileHeight = tile.height + tile.margin.bottom;
      var heightOfAllTiles = totalTileHeight * tile.countPerColumn;
      return $timeline([
        [0.4, [tileGrid.margin.left, heightOfAllTiles + 200, 0], Easing.outBack],
        [0.8, [tileGrid.margin.left, heightOfAllTiles, 0]]
      ]);
    }(),
    opacity: $timeline([
      [0.4, 0, Easing.inOutQuart],
      [0.8, 1]
    ])
  };

/*--------------------------------------------------------------*/

  $scope.data = {
    repeatCount: 0
  };

  $scope.cats = [];

  $scope.$watch('data.repeatCount', function(newVal, oldVal) {
    if (newVal) {
      $scope.cats = [];
      for (var i = 0; i < Number(newVal); i++) {
        $scope.cats.push(catData[i]);
      }
    }
  });

  $scope.catTile = {
    translate: function(catT, $index) {
      var totalWidth = tile.width + tile.margin.left;
      var x = $index >= tile.countPerColumn ? totalWidth : 0;

      var totalHeight = tile.height + tile.margin.bottom;
      var y = ($index % tile.countPerColumn) * totalHeight;

      var z = 0;

      return [x, y, z];
    },
    rotateX: $timeline([
      [0, -Math.PI / 2, Easing.outElastic],
      [0.99, 0, Easing.inQuart],
      [1.99, -Math.PI / 2]
    ])
  };

  $scope.catEnter = function(t, $done) {
    t.set(1, { duration: 1500 }, $done);
  };

  $scope.catLeave = function(t, $done) {
    t.halt();
    t.set(2, { duration: 100 }, function() {
      t.set(0, { duration: 1 });
      $done();
    });
  };

/*--------------------------------------------------------------*/

  var catData = [
    {
      picture: 'img/cats/cat1.png',
      name: 'Rocco',
      location: 'Seattle, WA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat2.png',
      name: 'Tabby',
      location: 'Phoenix, AR',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat3.png',
      name: 'Meiska',
      location: 'Reston, VA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat4.png',
      name: 'Fat Max',
      location: 'San Francisco, CA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat5.png',
      name: 'Izzy',
      location: 'Atlanta, GA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat6.png',
      name: 'Powder',
      location: 'Seattle, WA',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat7.png',
      name: 'David',
      location: 'Salem, OR',
      t: new Transitionable(0)
    },
    {
      picture: 'img/cats/cat8.png',
      name: 'Maggie',
      location: 'Sarasota, FL',
      t: new Transitionable(0)
    }
  ];

});
