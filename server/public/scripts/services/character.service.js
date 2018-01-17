app.service('CharacterService', function($location, $http){
    var self = this;

    self.characterSheetArray = { details:[] };
    self.characterInventoryArray = { list: [] };

    self.getCharacterSheet = function(campaignId) {
        console.log('get sheet', campaignId)
        $http({
            method: 'GET',
            url: '/character/sheet/' + campaignId,
        }).then(function(response){
            console.log('getCharacterSheetResponse is',response.data);
            self.characterSheetArray.details = response.data;
        });
    };

    self.getCharacterInventory = function(campaignId) {
        console.log('get inventory');
        $http({
            method: 'GET',
            url: '/character/inventory/' + campaignId,
        }).then(function(response){
            console.log(response.data); 
            self.characterInventoryArray.list = response.data
        });
    };

});