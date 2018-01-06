app.controller('EncounterController', function(UserService, EncounterService, $scope) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;
    self.encounterArray = EncounterService.encounterArray;
    EncounterService.getEncounter();
    self.getCurrentEncounter = EncounterService.currentEncounter;
    self.currentEncounterArray = EncounterService.currentEncounterArray;

    //this does not work yet
    $scope.$on('dragToReorder.dropped', (e, data) => {
      self.encounters = data.list.map((encounter, i) => {
        encounter.rank = i + 1;
        return encounter;
      });
    });

    self.rollInitiative = function(characterArray) {
      for (let i = 0; i < characterArray.length; i++) {
        var character = characterArray[i];
        character.initiative = (Math.floor(Math.random() * 20)) + 1;
        console.log(character.initiative);
      }
    }

  });
  