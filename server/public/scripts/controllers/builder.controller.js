app.controller('BuilderController', function(UserService, BuilderService, EncounterService) {
    console.log('BuilderController created');
    var self = this;
    self.userService = UserService;
    self.newEncounter = BuilderService.newEncounter;    
    self.newEncounterObject = BuilderService.newEncounterObject;

    self.searchMonster = BuilderService.searchMonster;
    self.monsterArray = BuilderService.monsterArray;
    self.addToEncounter = BuilderService.addToEncounter;
    self.encounterArray = BuilderService.encounterArray.list;

    self.currentEncounterArray = EncounterService.currentEncounter.list;

    BuilderService.getEncounter();
    
  });
  