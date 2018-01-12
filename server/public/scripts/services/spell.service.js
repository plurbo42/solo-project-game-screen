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

    self.getCharacterSpellbook = function(characterId) {
      $http({
        method: 'GET',
        url: '/spell/spellbook/' + characterId,
      }).then(function (response){
        self.spellbookArry.list = response.data;
      })
    };

  });
  