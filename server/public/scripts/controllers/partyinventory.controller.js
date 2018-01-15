app.controller('PartyInventoryController', function(UserService, PartyService, CampaignService, $routeParams) {
    console.log('PartyInventoryController created');
    var self = this;
    self.userService = UserService;
    self.selectedCampaignId = $routeParams.id;    

    //PartyService
    self.partyArray = PartyService.partyArray;

    PartyService.getParty();


  });