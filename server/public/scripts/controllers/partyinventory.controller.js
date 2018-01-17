app.controller('PartyInventoryController', function(UserService, PartyService, CampaignService, $routeParams) {
    console.log('PartyInventoryController created');
    var self = this;
    self.userService = UserService;
    self.selectedCampaignId = $routeParams.id;    

    //PartyService
    self.partyArray = PartyService.partyArray;
    PartyService.getParty();
    self.partyInventoryArray = PartyService.partyInventoryArray;
    PartyService.getPartyInventory(self.selectedCampaignId);

    self.claimLoot = PartyService.claimLoot;

  });