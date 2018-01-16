app.service('BuilderService', function ($http, $location) {
    console.log('BuilderService Loaded');
    var self = this;
    self.monsterArray = { list: [] };
    self.encounterArray = { list: [] };
    self.currentEncounterArray = { list: [] };
    self.itemTypeArray = { list: [] };
    self.itemSearchArray = { list: [] };

    // // add new encounter - TODO - add campaign logic. Need to put return on post request to pull into Current Encounter get request QUESTION should this also move to encounter service??
    // self.newEncounter = function (newEncounterObject) {
    //     console.log('clicked new encounter', newEncounterObject);
    //     $http({
    //         method: 'POST',
    //         url: '/builder/new',
    //         data: newEncounterObject,
    //     }).then(function (response) {
    //         console.log(response);
    //     });
    // };

    // // this should probably be handled in Encounter service ?? - this logic will be needed in encounter view and builder view
    // self.getEncounter = function () {
    //     console.log('get encounter');
    //     $http({
    //         method: 'GET',
    //         url: '/encounter/all',
    //     }).then(function (response) {
    //         console.log('encounter list', response.data)
    //         self.encounterArray.list = response.data
    //     });
    // };

    // self.currentEncounter = function (id) {
    //     console.log('in get current encounter', id);
    //     $http({
    //         method: 'GET',
    //         url: 'encounter/current/' + id,
    //     }).then(function (response) {
    //         console.log('current encounter', response.data);
    //         self.currentEncounterArray.list = response.data;
    //         self.getEncounterItems(id);
    //     });
    // };

    //search monster by name
    self.searchMonster = function (monsterNameObject) {
        console.log('clicked search', monsterNameObject)
        $http({
            method: 'GET',
            url: '/builder/search',
            params: monsterNameObject,
        }).then(function (response) {
            console.log(response.data);
            self.monsterArray.list = response.data;
        });
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
            self.currentEncounter(encounterId);
        });
    };

    //get list of item types for type dropdown
    self.getItemType = function () {
        $http({
            method: 'GET',
            url: '/builder/itemtype',
        }).then(function(response){
            console.log(response.data);
            self.itemTypeArray.list = response.data
        });
    };

    //search for item by name in encounter loot tab
    self.itemSearch = function (searchTerm) {
        console.log('item name search, search term', searchTerm);
        $http({
            method: 'GET',
            url: '/builder/itemSearch',
            params: searchTerm,
        }).then(function(response){
            console.log(response.data);
            self.itemSearchArray.list = response.data
        });
    };

    //add loot to this encounter
    self.addLootToEncounter = function (itemId, encounterId) {
        var encounterAddObject = {};
        encounterAddObject.itemId = itemId;
        encounterAddObject.encounterId = encounterId;
        console.log('addLootToEncounter', encounterAddObject, encounterId)
        $http({
            method: 'POST',
            url: '/builder/addLoot',
            data: encounterAddObject,
        }).then(function(response){
            console.log(response);
            self.currentEncounter(encounterId);           
        });
    };


});
