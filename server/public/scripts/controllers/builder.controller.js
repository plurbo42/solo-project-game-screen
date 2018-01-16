app.controller('BuilderController', function(UserService, BuilderService, EncounterService, CampaignService, $routeParams) {
    console.log('BuilderController created');
    var self = this;
    self.userService = UserService;

    self.selectedCampaignId = $routeParams.id

    EncounterService.getEncounter($routeParams.id);
    BuilderService.getItemType();

    //BuilderService
    self.searchMonster = BuilderService.searchMonster;
    self.monsterArray = BuilderService.monsterArray;
    self.itemTypeArray = BuilderService.itemTypeArray;
    self.itemSearch = BuilderService.itemSearch;
    self.itemSearchArray = BuilderService.itemSearchArray;
    
    //EncounterService
    self.newEncounter = EncounterService.newEncounter;    
    self.newEncounterObject = EncounterService.newEncounterObject;
    self.encounterArray = EncounterService.encounterArray;
    self.groupsArray = EncounterService.groupsArray;
    self.encounterDetails = EncounterService.encounterDetails;
    self.getEncounterDetail = EncounterService.getEncounterDetail;
    //encounter item/loot management
    self.getEncounterItems = EncounterService.getEncounterItems;
    self.encounterItemsArray = EncounterService.encounterItemsArray;
    self.addLootToEncounter = EncounterService.addLootToEncounter;
    self.deleteLoot = EncounterService.deleteLoot;
    //get encounter information for encounter to be edited
    self.getEditingEncounter = EncounterService.getEditingEncounter;
    self.editingEncounterArray = EncounterService.editingEncounterArray;
    self.deleteNPC = EncounterService.deleteNPC;
    self.addToEncounter = EncounterService.addToEncounter;
    

  
  });
  