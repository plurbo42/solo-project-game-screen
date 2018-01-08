app.controller('EncounterController', function(UserService, EncounterService, PartyService, $scope) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;
    self.encounterArray = EncounterService.encounterArray;
    EncounterService.getEncounter();
    self.getCurrentEncounter = EncounterService.currentEncounter;
    self.currentEncounterArray = EncounterService.currentEncounterArray;
    
    
    //TODO - presently moving this inside the getCurrentEncounter function - this will likely have to change later to allow for the introduction of player characters. 
    // self.rollInitiative = function(characterArray) {
    //   for (let i = 0; i < characterArray.length; i++) {
    //     var character = characterArray[i];
    //     character.initiative = (Math.floor(Math.random() * 20)) + 1;
    //     console.log(character.initiative);
    //   }
    // }

  });
  