app.controller('BuilderController', function(UserService, BuilderService, EncounterService) {
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

    self.encounterArray = EncounterService.encounterArray.list;
    self.currentEncounter = EncounterService.currentEncounter;    
    self.currentEncounterArray = EncounterService.currentEncounterArray;

    
  });
  