app.service('BuilderService', function($http, $location){
    console.log('BuilderService Loaded');
    var self = this;
    self.monsterArray = { list: [] };

    self.searchEncounter = function(monsterNameObject){ 
        console.log('clicked search', monsterNameObject)
        $http({
            method: 'GET',
            url: '/builder/search',
            params: monsterNameObject,
        }).then(function(response){
            console.log(response.data);
            self.monsterArray.list = response.data;
        })
    };

    //add monster from search result to encounter
    self.addToEncounter = function(monsterId){
        console.log('add monster', monsterId)
        $http({
            method: 'POST',
        })
    }

  });
  