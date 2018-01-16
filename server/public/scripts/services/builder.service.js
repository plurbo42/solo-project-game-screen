app.service('BuilderService', function ($http, $location) {
    console.log('BuilderService Loaded');
    var self = this;
    self.monsterArray = { list: [] };
    self.encounterArray = { list: [] };
    self.currentEncounterArray = { list: [] };
    self.itemTypeArray = { list: [] };
    self.itemSearchArray = { list: [] };

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

});
