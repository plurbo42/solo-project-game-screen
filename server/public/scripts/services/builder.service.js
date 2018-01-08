app.service('BuilderService', function ($http, $location) {
    console.log('BuilderService Loaded');
    var self = this;
    self.monsterArray = { list: [] };
    self.encounterArray = { list: [] };
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
                self.getEncounter();
                // self.getCurrentEncounter - with return encounter id???
            })
    };

    // this should probably be handled in Encounter service ?? - this logic will be needed in encounter view and builder view
    self.getEncounter = function () {
        console.log('get encounter');
        $http({
            method: 'GET',
            url: '/builder/encounterlist',
        }).then(function (response) {
            console.log('encounter list', response.data)
            self.encounterArray.list = response.data
        })
    }


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
    self.addToEncounter = function (monsterId, encounterId) {
        var encounterAddObject = {};
        encounterAddObject.monsterId = monsterId;
        encounterAddObject.encounterId = encounterId;
        console.log('add monster', encounterAddObject)
        $http({
            method: 'POST',
            url: '/builder/addnpc',
            data: encounterAddObject,
        }).then(function (response) {
            console.log(response);
        })
    }

});
