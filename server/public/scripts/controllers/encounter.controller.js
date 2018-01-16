app.controller('EncounterController', function(UserService, EncounterService, PartyService, CampaignService, $routeParams, $mdDialog) {
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
    
    self.showConfirm = function(ev) {
      var confirm = $mdDialog.confirm()
            .title('End this encounter?')
            .textContent('Mark encounter complete and send loot to Party Inventory?')
           // .ariaLabel('end encounter')
            .targetEvent(ev)
            .ok('Confirm')
            .cancel('Cancel');
      $mdDialog.show(confirm).then(function() {
        console.log('encounter ended');
        self.endEncounter(self.selectedEncounter.id)
        self.currentEncounterArray = {};
        EncounterService.getEncounter(self.selectedCampaignId);
      }, function() {
       console.log('cancelled encounter end');
      });
    };
  
  
  });
  