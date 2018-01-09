app.controller('EncounterController', function(UserService, EncounterService, PartyService, CampaignService, $routeParams) {
    console.log('EncounterController created');
    var self = this;
    self.userService = UserService;

    self.selectedCampaignId = CampaignService.selectedCampaignId;
    self.campaignId = $routeParams.id

    self.encounterArray = EncounterService.encounterArray;
    EncounterService.getEncounter(self.campaignId);
    self.getCurrentEncounter = EncounterService.currentEncounter;
    self.currentEncounterArray = EncounterService.currentEncounterArray;

  });
  