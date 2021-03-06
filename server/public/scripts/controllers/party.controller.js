app.controller('PartyController', function(UserService, PartyService, CampaignService, $routeParams) {
    console.log('PartyController created');
    var self = this;
    self.userService = UserService;

    //Campaign Service
    self.selectedCampaignId = $routeParams.id;    

    //PartyService
    self.partyArray = PartyService.partyArray;
    self.raceArray = PartyService.raceArray;
    self.classArray = PartyService.classArray;
    self.alignmentArray = PartyService.alignmentArray;
    self.skillsArray = PartyService.skillsArray;
    self.addCharacter = PartyService.addCharacter;
    self.newCharacter = PartyService.newCharacterObject;


    PartyService.getParty();
    PartyService.getRace();
    PartyService.getClass();
    PartyService.getAlignment();
    PartyService.getSkillList();

  });