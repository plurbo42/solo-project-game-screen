app.service('SpellService', function ($http, $location) {
    console.log('SpellService Loaded');
    var self = this;

    self.spellArray = { list: [] };
    self.classArray = { list: [] };
    self.spellbookArray = { list: [] };
    

    self.getClassList = function() {
      $http({
        method: 'GET',
        url: '/spell/class'
      }).then(function(response){
        self.classArray.list = response.data;
      })
    };

    self.getSpellByClass = function(classId) {
      $http({
        method: 'GET',
        url: '/spell/spellclass/' + classId,
      }).then(function (response){
        self.spellArray.list = response.data;
      })
    };

    self.getCharacterSpellbook = function(campaignId) {
      $http({
        method: 'GET',
        url: '/spell/spellbook/' + campaignId,
      }).then(function (response){
        self.spellbookArray.list = response.data;
      })
    };

    self.addToSpellbook = function(spellId, characterId) {
      var characterSpell = {};
      characterSpell.characterId = characterId;
      characterSpell.spellId = spellId;
      console.log('addToSpellBook', characterSpell);
      $http({
        method: 'POST',
        url: '/spell/addToSpellbook',
        data: characterSpell,
      }).then(function (response){
        console.log(response)
      })
    };

  });
  