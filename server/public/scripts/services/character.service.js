app.service('CharacterService', function($location, $http){
    var self = this;

    self.characterSheetArray = { details:[] };

    self.getCharacterSheet = function(campaignId) {
        console.log('get sheet', campaignId)
        $http({
            method: 'GET',
            url: '/character/sheet/' + campaignId,
        }).then(function(response){
            console.log(response.data);
            self.characterSheetArray.details = response.data;
        })
    }

});