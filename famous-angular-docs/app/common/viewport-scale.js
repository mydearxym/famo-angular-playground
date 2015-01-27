angular.module('famous-angular')

.run(function($rootScope, $media, stateUtils) {

  var NAVBAR = {
    HEIGHT: 100
  };

  var _forcedResolution;

  resizeHandler();
  $(window).bind('resize', resizeHandler);

  function resizeHandler() {
    determineResolution();
    setLeftOffset();
  }

  // iPhone 5 without bars: 320 x 568
  // With bars: 320 x 460

  function determineResolution() {
    // These dimensions will always be set on the fa-app via CSS, regardless 
    // of the user's actual window dimensions

    var size_xs = !$media.$query('sm');

    if (size_xs) {
      // No navbar for mobile
      NAVBAR.HEIGHT = 0;


      _forcedResolution = {
        width: 768,
        height: 1366 - NAVBAR.HEIGHT

        // To match iOS 320 x 460, ~11.13:16
        //height: 1104 - NAVBAR.HEIGHT
      };
    } else {
      NAVBAR.HEIGHT = 100;

      _forcedResolution = {
        width: 1920,
        height: 1080 - NAVBAR.HEIGHT
      };
    }
  }

  // Set the left offset based upon the scale amount, to re-center the fa-app
  function setLeftOffset() {
    var scale = getViewportScale();

    var leftOffset = (window.innerWidth / 2) - (scale * _forcedResolution.width / 2);
  
    $('#fa-app').css({
      '-webkit-transform' : 'scale(' + scale + ', ' + scale + ')',
      '-moz-transform'    : 'scale(' + scale + ', ' + scale + ')',
      '-ms-transform'     : 'scale(' + scale + ', ' + scale + ')',
      '-o-transform'      : 'scale(' + scale + ', ' + scale + ')',
      'transform'         : 'scale(' + scale + ', ' + scale + ')' 
    });
    $('#fa-app').css({
      '-webkit-transform-origin' : '0 0',
      '-moz-transform-origin'    : '0 0',
      '-ms-transform-origin'     : '0 0',
      '-o-transform-origin'      : '0 0',
      'transform-origin'         : '0 0' 
    });

    // Don't set a left value if the window width is greater than the
    // supported resolution.  Instead, let margin: auto center the viewport
    if (window.innerWidth > _forcedResolution.width) return;

    $('#fa-app').css('left', Math.floor(leftOffset));
  }

  function getViewportScale() {
    var xScale, yScale;

    var viewport = {
      height: window.innerHeight - NAVBAR.HEIGHT,
      width: window.innerWidth
    };

    if (viewport.height < _forcedResolution.height) {
      yScale = viewport.height / _forcedResolution.height;
      yScale = yScale.toFixed(2);
    } else {
      yScale = 1;
    }

    if (viewport.width < _forcedResolution.width) {
      xScale = viewport.width / _forcedResolution.width;
      xScale = xScale.toFixed(2);
    } else {
      xScale = 1;
    }

    var smallestScale = xScale < yScale ? xScale : yScale;

    return smallestScale;
  };

});
