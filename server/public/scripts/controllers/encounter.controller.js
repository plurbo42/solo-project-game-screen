app.controller('EncounterController', function(UserService, EncounterService, PartyService, CampaignService, $routeParams) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;

    self.selectedCampaignId = $routeParams.id;

    self.encounterArray = EncounterService.encounterArray;
    EncounterService.getEncounter(self.selectedCampaignId);
    self.getCurrentEncounter = EncounterService.currentEncounter;
    self.currentEncounterArray = EncounterService.currentEncounterArray;
    self.getEncounterDetails = EncounterService.getEncounterDetails;
    self.encounterDetails = EncounterService.encounterDetails;

    self.nextTurn = EncounterService.nextTurn;

    self.encounterStatus = EncounterService.encounterStatus;
  
    
  });
  