app.controller('BuilderController', function(UserService, BuilderService, EncounterService, $mdSidenav, $scope) {
    console.log('BuilderController created');
    var self = this;
    self.userService = UserService;

    EncounterService.getEncounter();

    //BuilderService
    self.newEncounter = BuilderService.newEncounter;    
    self.newEncounterObject = BuilderService.newEncounterObject;

    self.searchMonster = BuilderService.searchMonster;
    self.monsterArray = BuilderService.monsterArray;
    self.addToEncounter = BuilderService.addToEncounter;
    
    //EncounterService

    self.encounterArray = EncounterService.encounterArray;
    self.currentEncounter = EncounterService.currentEncounter;    
    self.currentEncounterArray = EncounterService.currentEncounterArray;

    $scope.toShow = "home"; // Default
    
        $scope.toggleLeft = function() {
            $mdSidenav("left")
              .toggle();
        };
    
        $scope.close = function () {
          $mdSidenav('left').close();
        };
    
        $scope.show = function (toShow) {
          $scope.toShow = toShow;
        };
    
  });
  