app.service('PartyService', function ($http, $location) {
    console.log('PartyService Loaded');
    var self = this;
    var partyArray = { list: [] };

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

    //add Character request 
    self.addCharacter = function(newCharacterObject) {
        $http({
            method: 'POST',
            url: '/party/new',
            data: newCharacterObject,
        }).then(function(response){
            console.log(response);
            self.getParty();
        })
    }
  
  });
  