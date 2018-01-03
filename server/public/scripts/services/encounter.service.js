app.service('EncounterService', function($http, $location){
    console.log('EncounterService Loaded');
    var self = this;
    self.encounterArray = { list: [] };
    self.currentEncounter = { list: [] };

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
    self.currentEncounter = function(encounterId){
        console.log('in get current encounter', encounterId);
        $http({
            method: 'GET',
            url: 'encounter/current/' + encounterId,
        }).then(function(response){
            console.log(resonsnse.data);
            self.currentEcnounter.list = response.data;
        })
    };

  });
  