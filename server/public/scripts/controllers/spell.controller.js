app.controller('SpellController', function(UserService, SpellService, CampaignService, CharacterService, $routeParams){
    console.log('SpellController created');
    var self = this;

    self.selectedCampaignId = $routeParams.id;

    self.classArray = SpellService.classArray;
    self.spellArray = SpellService.spellArray;
    self.getSpellByClass = SpellService.getSpellByClass;
    
    SpellService.getClassList();
})