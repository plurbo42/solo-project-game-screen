app.controller('PartyController', function(UserService, PartyService) {
    console.log('PartyController created');
    var self = this;
    self.userService = UserService;

    self.partyArray = PartyService.partyArray;
    self.raceArray = PartyService.raceArray;
    self.classArray = PartyService.classArray;
    self.alignmentArray = PartyService.alignmentArray;
    self.addCharacter = PartyService.addCharacter;
    self.newCharacter = PartyService.newCharacterObject;

    PartyService.getParty();
    PartyService.getRace();
    PartyService.getClass();
    PartyService.getAlignment();

  });