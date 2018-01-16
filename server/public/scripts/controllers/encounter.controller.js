app.controller('EncounterController', function(UserService, EncounterService, PartyService, CampaignService, $routeParams) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;

    self.selectedCampaignId = $routeParams.id;

    //get encounter data
    self.encounterArray = EncounterService.encounterArray;
    EncounterService.getEncounter(self.selectedCampaignId);
    self.getCurrentEncounter = EncounterService.currentEncounter;
    self.currentEncounterArray = EncounterService.currentEncounterArray;
    self.getEncounterDetails = EncounterService.getEncounterDetails;
    self.encounterDetails = EncounterService.encounterDetails;

    //manage Encounter info
    self.nextTurn = EncounterService.nextTurn;
    self.encounterStatus = EncounterService.encounterStatus;
    self.removeCharacterFromInitiativeOrder = EncounterService.removeCharacterFromInitiativeOrder;
    self.endEncounter = EncounterService.endEncounter;
    
  });
  