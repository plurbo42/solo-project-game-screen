app.controller('CharacterController', function(UserService, PartyService, CharacterService, CampaignService, SpellService, $routeParams) {
    console.log('CharacterController created');
    var self = this;
    self.userService = UserService;

    //Campaign Service
    self.selectedCampaignId = CampaignService.selectedCampaignId;    

    //PartyService
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