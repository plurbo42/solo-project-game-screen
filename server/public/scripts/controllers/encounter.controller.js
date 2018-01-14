app.controller('EncounterController', function(UserService, EncounterService, PartyService, CampaignService, $routeParams) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;

    self.roundCount = EncounterService.roundCount;

    self.selectedCampaignId = $routeParams.id;

    self.encounterArray = EncounterService.encounterArray;
    EncounterService.getEncounter(self.selectedCampaignId);
    self.getCurrentEncounter = EncounterService.currentEncounter;
    self.currentEncounterArray = EncounterService.currentEncounterArray;

    self.nextTurn = EncounterService.nextTurn;
    
  });
  