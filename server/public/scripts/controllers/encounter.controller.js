app.controller('EncounterController', function(UserService, EncounterService) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;
    self.encounterArray = EncounterService.encounterArray;
    EncounterService.getEncounter();
    self.getCurrentEncounter = EncounterService.currentEncounter;
    self.currentEncounterArray = EncounterService.currentEncounterArray;

  });
  