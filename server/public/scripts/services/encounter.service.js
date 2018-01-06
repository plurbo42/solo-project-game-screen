app.service('EncounterService', function($http, $location){
    console.log('EncounterService Loaded');
    var self = this;
    self.encounterArray = { list: [] };
    self.currentEncounterArray = { list: [] };

    self.rollInitiative = function(characterArray) {
        for (let i = 0; i < characterArray.length; i++) {
          var character = characterArray[i];
          character.initiative = (Math.floor(Math.random() * 20)) + 1;
        }
        return characterArray;
      };

    //get for list of all encounters - TODO change this to pull only encounters for current campaign
    self.getEncounter = function(){ 
        console.log('get encounter');
        $http({
            method: 'GET',
            url: '/encounter/all',
        }).then(function(response){
            console.log(response.data);
            self.encounterArray.list = response.data;
        })
    };

    //get data for current encounter - used on encounter view and builder view to edit and play out current encounter
    //TODO - currently rolling initiative within this function - will likely want to separate this later? Or add PCs before starting encounter
    self.currentEncounter = function(id){
        console.log('in get current encounter', id);
        $http({
            method: 'GET',
            url: 'encounter/current/' + id,
        }).then(function(response){
            console.log('current encounter', response.data);
            self.currentEncounterArray.list = response.data;
            self.rollInitiative(self.currentEncounterArray.list);
        })
    };

  });
  