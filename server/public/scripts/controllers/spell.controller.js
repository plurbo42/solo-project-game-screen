app.controller('SpellController', function (UserService, SpellService, CampaignService, CharacterService, $routeParams) {
    console.log('SpellController created');
    var self = this;

    self.selectedCampaignId = $routeParams.id;

    self.classArray = SpellService.classArray;
    self.spellArray = SpellService.spellArray;
    self.getSpellByClass = SpellService.getSpellByClass;
    self.addToSpellbook = SpellService.addToSpellbook;


    SpellService.getClassList();

    CharacterService.getCharacterSheet($routeParams.id);

    self.characterSheetArray = CharacterService.characterSheetArray;

    console.log('The character details are:', vm.characterSheetArray)
    // self.characterId = CharacterService.characterSheetArray[0].id;



})