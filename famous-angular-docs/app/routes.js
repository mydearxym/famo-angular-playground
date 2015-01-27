angular.module('famous-angular')

.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('intro', {
      url: '/intro',
      templateUrl: 'build/templates/state-intro.html',
      controller: 'StateIntroCtrl',
      data: {
        index: 0,
        scrollTimelineMax: 100,
        enterAnimationDuration: 1000,
        leaveAnimationDuration: 300,
        cssClass: 'state-intro',
        pageTitle: 'Intro'
      }
    })
    .state('1', {
      url: '/1',
      templateUrl: 'build/templates/state-1.html',
      controller: 'State1Ctrl',
      data: {
        index: 1,
        scrollTimelineMax: 200,
        enterAnimationDuration: 1500,
        leaveAnimationDuration: 300,
        cssClass: 'state-1',
        pageTitle: 'Render Tree'
      }
    })
    .state('2', {
      url: '/2',
      templateUrl: 'build/templates/state-2.html',
      controller: 'State2Ctrl',
      data: {
        index: 2,
        scrollTimelineMax: 300,
        enterAnimationDuration: 1500,
        leaveAnimationDuration: 300,
        cssClass: 'state-2',
        pageTitle: 'Data Binding'
      }
    })
    .state('3', {
      url: '/3',
      templateUrl: 'build/templates/state-3.html',
      controller: 'State3Ctrl',
      data: {
        index: 3,
        scrollTimelineMax: 400,
        enterAnimationDuration: 1000,
        leaveAnimationDuration: 300,
        cssClass: 'state-3',
        pageTitle: 'Angular Directives'
      }
    })
    .state('4', {
      url: '/4',
      templateUrl: 'build/templates/state-4.html',
      controller: 'State4Ctrl',
      data: {
        index: 4,
        scrollTimelineMax: 500,
        enterAnimationDuration: 1500,
        leaveAnimationDuration: 300,
        cssClass: 'state-4',
        pageTitle: 'Organization'
      }
    })
    .state('5', {
      url: '/5',
      templateUrl: 'build/templates/state-5.html',
      controller: 'State5Ctrl',
      data: {
        index: 5,
        scrollTimelineMax: 600,
        enterAnimationDuration: 2000,
        leaveAnimationDuration: 300,
        cssClass: 'state-5',
        pageTitle: 'Unification'
      }
    })
    .state('download', {
      url: '/download',
      template: '<div></div>',
      controller: 'StateEndCtrl',
      data: {
        index: 6,
        scrollTimelineMax: 700,
        enterAnimationDuration: 500,
        leaveAnimationDuration: 500,
        cssClass: '',
        pageTitle: 'Download'
      }
    });

    $urlRouterProvider.otherwise('intro');
})

;
