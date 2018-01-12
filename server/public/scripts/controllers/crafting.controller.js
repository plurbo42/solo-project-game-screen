app.controller('CraftingController', function(UserService, SpellService, CampaignService, CharacterService, $routeParams){
    console.log('CraftingController created');
    var self = this;

    self.selectedCampaignId = $routeParams.id;

})