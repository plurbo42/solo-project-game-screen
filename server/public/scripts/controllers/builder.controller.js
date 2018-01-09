app.controller('BuilderController', function(UserService, BuilderService, EncounterService) {
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
    
  });
  