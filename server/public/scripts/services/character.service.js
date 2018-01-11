app.service('CharacterService', function($location, $http){
    var self = this;

    self.characterSheetArray = { list: [] };

    self.getCharacterSheet = function(campaignId) {
        $http({
            method: 'GET',
            url: '/character/sheet/' + campaignId,
        }).then(function(response){
            console.log(response.data);
            self.characterSheetArray.list = response.data;
        })
    }
});