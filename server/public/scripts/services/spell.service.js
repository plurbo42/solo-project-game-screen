app.service('SpellService', function ($http, $location) {
    console.log('SpellService Loaded');
    var self = this;

    self.spellArray = { list: [] };
    self.classArray = { list: [] };

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

  });
  