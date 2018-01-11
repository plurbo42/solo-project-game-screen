var app = angular.module('app', ['ngRoute', 'ngMaterial', 'ngDragToReorder', 'mdDataTable']);

/// Routes ///
app.config(function($routeProvider, $locationProvider) {
  $locationProvider.hashPrefix('');
  console.log('app -- config')
  $routeProvider
    .when('/home', {
      templateUrl: '/views/templates/home.html',
      controller: 'LoginController as lc',
    })
    .when('/register', {
      templateUrl: '/views/templates/register.html',
      controller: 'LoginController as lc'
    })
    .when('/user', {
      templateUrl: '/views/templates/user.html',
      controller: 'UserController as uc',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/campaign', {
      templateUrl: '/views/templates/campaign.html',
      controller: 'CampaignController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/info/:id', {
      templateUrl: '/views/templates/info.html',
      controller: 'InfoController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/builder/:id', {
      templateUrl: '/views/templates/builder.html',
      controller: 'BuilderController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/encounter/:id', {
      templateUrl: '/views/templates/encounter.html',
      controller: 'EncounterController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/party/:id', {
      templateUrl: '/views/templates/party.html',
      controller: 'PartyController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/board/:id', {
      templateUrl: '/views/templates/board.html',
      controller: 'BoardController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/character/:id', {
      templateUrl: '/views/templates/character.html',
      controller: 'CharacterController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .when('/spells/:id', {
      templateUrl: '/views/templates/spells.html',
      controller: 'SpellController as vm',
      resolve: {
        getuser : function(UserService){
          return UserService.getuser();
        }
      }
    })
    .otherwise({
      redirectTo: 'home'
    });
});
