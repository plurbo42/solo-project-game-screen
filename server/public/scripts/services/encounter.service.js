app.service('EncounterService', function ($http, $location) {
    console.log('EncounterService Loaded');
    var self = this;
    self.encounterArray = { list: [] };
    self.currentEncounterArray = { list: [] };
    self.newEncounterObject = { description: '' };
    self.playerCharacterArray = { list: [] };

    self.roundCount = 1;
    self.turnsInRound = 0;

    //TODO - this now adds initiative bonuses, but for some reason is running through the for loop twice?? 
    self.rollInitiative = function (characterArray) {
        for (let i = 0; i < characterArray.length; i++) {
            var character = characterArray[i];
            var bonus = character.initiative_bonus;
            character.initiative = (Math.floor(Math.random() * 20)) + 1 + bonus;
            // console.log('this array is', characterArray.length, 'long. this is turn', i, 'character', bonus);
        }
        characterArray.sort(function (a, b) {
            return b.initiative - a.initiative
        });
        return characterArray;
    };

    self.nextTurn = function (characterArray) {
        thisCharacter = characterArray.shift()
        console.log(thisCharacter);
        characterArray.push(thisCharacter);
        // self.turnsInRound ++
        // if (characterArray.length = self.turnsInRound){
        //     self.roundCount ++;
        //     self.turnsInRound = 0;
        // }
    }


    //get for list of all encounters - TODO change this to pull only encounters for current campaign
    self.getEncounter = function (id) {
        console.log('get encounter');
        $http({
            method: 'GET',
            url: '/encounter/all/' + id,
        }).then(function (response) {
            console.log(response.data);
            self.encounterArray.list = response.data;
        })
    };

    //TODO - get characters, change to campaign specific. Also, add logic to add just certain characters to the encounter. 
    //TODO - currently rolling initiative within this function - will likely want to separate this later? 

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
                self.rollInitiative(self.currentEncounterArray.list);
            };
        })
    };


    //get data for current encounter - used on encounter view and builder view to edit and play out current encounter
    self.currentEncounter = function (id) {
        console.log('in get current encounter', id);
        $http({
            method: 'GET',
            url: 'encounter/current/' + id,
        }).then(function (response) {
            console.log('current encounter', response.data);
            self.currentEncounterArray.list = response.data;
            self.getPlayerCharacters();
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
