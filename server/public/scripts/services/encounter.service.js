app.service('EncounterService', function ($http, $location) {
    console.log('EncounterService Loaded');
    var self = this;
    self.encounterArray = { list: [] };
    self.currentEncounterArray = { list: [] };
    self.newEncounterObject = { description: '' };
    self.playerCharacterArray = { list: [] };

    self.rollInitiative = function (characterArray) {
        for (let i = 0; i < characterArray.length; i++) {
            var character = characterArray[i];
            character.initiative = (Math.floor(Math.random() * 20)) + 1;
          //  character.initiative += Number(character.initative_bonus);
        }
        return characterArray;
    };

    //get for list of all encounters - TODO change this to pull only encounters for current campaign
    self.getEncounter = function () {
        console.log('get encounter');
        $http({
            method: 'GET',
            url: '/encounter/all',
        }).then(function (response) {
            console.log(response.data);
            self.encounterArray.list = response.data;
        })
    };

    //TODO - get characters, change to campaign specific. Also, add logic to add just certain characters to the encounter. 

    self.getPlayerCharacters = function () {
        console.log('in get player characters');
        $http({
            method: 'GET',
            url: 'encounter/players',
        }).then(function (response) {
            console.log(response.data);
            self.playerCharacterArray.list = response.data;
            for (let i = 0; i < self.playerCharacterArray.list.length; i++) {
                var player = self.playerCharacterArray.list[i];
                self.currentEncounterArray.list.push(player);
            };
        })
    };


    //get data for current encounter - used on encounter view and builder view to edit and play out current encounter
    //TODO - currently rolling initiative within this function - will likely want to separate this later? Or add PCs before starting encounter
    self.currentEncounter = function (id) {
        console.log('in get current encounter', id);
        $http({
            method: 'GET',
            url: 'encounter/current/' + id,
        }).then(function (response) {
            console.log('current encounter', response.data);
            self.currentEncounterArray.list = response.data;
            self.getPlayerCharacters();
            self.rollInitiative(self.currentEncounterArray.list);
            console.log(self.currentEncounterArray.list, 'is the current encounter')
        })
    };

    self.newEncounter = function (newEncounterObject) {
        console.log('clicked new encounter', newEncounterObject);
        $http({
            method: 'POST',
            url: '/builder/new',
            data: newEncounterObject,
        }).then(function (response) {
            console.log(response);
            self.getEncounter();
            self.newEncounterObject.description = ''
            self.newEncounterObject.notes = ''

        })
    };



});
