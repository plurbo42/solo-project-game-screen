app.service('PartyService', function ($http, $location) {
    console.log('PartyService Loaded');
    var self = this;
    self.partyArray = { list: [] };

    self.raceArray = { list: [] };
    self.classArray = { list: [] };
    self.alignmentArray = { list: [] };

    //TODO - adjust this request to be campaign specific
    self.getParty = function() {
        $http({
            method: 'GET',
            url: '/party/all',
        }).then(function(response){
            console.log(response.data);
            self.partyArray.list = response.data;
        })
    };

    self.getRace = function() {
        $http({
            method: 'GET',
            url: '/party/race',
        }).then(function(response){
            console.log(response.data);
            self.raceArray.list = response.data;
        })
    };

    self.getClass = function() {
        $http({
            method: 'GET',
            url: '/party/class',
        }).then(function(response){
            console.log(response.data);
            self.classArray.list = response.data;
        })
    };

    self.getAlignment = function() {
        $http({
            method: 'GET',
            url: '/party/alignment',
        }).then(function(response){
            console.log(response.data);
            self.alignmentArray.list = response.data;
        })
    };
    //add Character request 
    self.addCharacter = function(newCharacterObject) {
        console.log('in add character', newCharacterObject)
        $http({
            method: 'POST',
            url: '/party/new',
            data: newCharacterObject,
        }).then(function(response){
            console.log(response);
            self.getParty();
        })
    };
  
  });
  