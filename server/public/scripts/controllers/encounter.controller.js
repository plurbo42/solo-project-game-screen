app.controller('EncounterController', function(UserService, EncounterService) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;
    self.encounterArray = EncounterService.encounterArray.list;
    EncounterService.getEncounter();
    
    self.getCurrentEncounter = EncounterService.currentEncounter();

  });
  