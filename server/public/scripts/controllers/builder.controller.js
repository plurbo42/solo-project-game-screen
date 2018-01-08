app.controller('BuilderController', function(UserService, BuilderService, EncounterService, $mdSidenav, $scope) {
    console.log('BuilderController created');
    var self = this;
    self.userService = UserService;

    EncounterService.getEncounter();

    //BuilderService
    self.searchMonster = BuilderService.searchMonster;
    self.monsterArray = BuilderService.monsterArray;
    self.addToEncounter = BuilderService.addToEncounter;
    self.currentEncounter = BuilderService.currentEncounter;    
    self.currentEncounterArray = BuilderService.currentEncounterArray;
    
    //EncounterService
    self.newEncounter = EncounterService.newEncounter;    
    self.newEncounterObject = EncounterService.newEncounterObject;
    self.encounterArray = EncounterService.encounterArray;

    //TODO - this garbage is for the minimally functional sidenav. Might scrap that idea altogether - REMOVE IF SO
    // $scope.toShow = "home"; // Default
    
    //     $scope.toggleLeft = function() {
    //         $mdSidenav("left")
    //           .toggle();
    //     };
    
    //     $scope.close = function () {
    //       $mdSidenav('left').close();
    //     };
    
    //     $scope.show = function (toShow) {
    //       $scope.toShow = toShow;
    //     };
    
  });
  