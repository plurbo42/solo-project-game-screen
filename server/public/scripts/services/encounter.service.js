app.service('EncounterService', function($http, $location){
    console.log('EncounterService Loaded');
    var self = this;
    self.encounterArray = { list: [] };

    self.getEncounter = function(){ 
        console.log('get encounter')
        $http({
            method: 'GET',
            url: '/encounter/all',
        }).then(function(response){
            console.log(response.data);
            self.encounterArray.list = response.data;
        })
    };

  });
  