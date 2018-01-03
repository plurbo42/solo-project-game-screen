app.service('BuilderService', function ($http, $location) {
    console.log('BuilderService Loaded');
    var self = this;
    self.monsterArray = { list: [] };
    self.currentEncounter = { list: [] };
    self.newEncounterObject = { description: '' };

    //add new encounter - TODO - add campaign logic. Need to put return on post request to pull into Current Encounter get request QUESTION should this also move to encounter service??
    self.newEncounter = function (newEncounterObject) {
        console.log('clicked new encounter', newEncounterObject);
            $http({
                method: 'POST',
                url: '/builder/new',
                data: newEncounterObject,
            }).then(function (response) {
                console.log(response);
                // self.getCurrentEncounter - with return encounter id???
            })
    };

    // this should probably be handled in Encounter service ?? - this logic will be needed in encounter view and builder view
    // self.getCurrentEncounter = function (encounterId) {
    //     console.log('got current encounter', encounterId);
    //     $http({
    //         method: 'GET',
    //         url: '/builder/current/' + encounterId
    //     }).then(function (response) {
    //         console.log('current encounter get')
    //     })
    // }


    self.searchMonster = function (monsterNameObject) {
        console.log('clicked search', monsterNameObject)
        $http({
            method: 'GET',
            url: '/builder/search',
            params: monsterNameObject,
        }).then(function (response) {
            console.log(response.data);
            self.monsterArray.list = response.data;
        })
    };

    //add monster from search result to encounter
    self.addToEncounter = function (monsterId) {
        console.log('add monster', monsterId)
        // $http({
        //     method: 'POST',
        // })
    }

});
