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
    self.addToEncounter = BuilderService.addToEncounter;
    self.currentEncounter = BuilderService.currentEncounter;    
    self.currentEncounterArray = BuilderService.currentEncounterArray;
    self.itemTypeArray = BuilderService.itemTypeArray;
    self.itemSearch = BuilderService.itemSearch;
    self.itemSearchArray = BuilderService.itemSearchArray;
    
    //EncounterService
    self.newEncounter = EncounterService.newEncounter;    
    self.newEncounterObject = EncounterService.newEncounterObject;
    self.encounterArray = EncounterService.encounterArray;
    self.groupsArray = EncounterService.groupsArray;
    self.getEncounterDetail = EncounterService.getEncounterDetail;
    self.getEncounterGroup = EncounterService.getEncounterGroup;



  });
  