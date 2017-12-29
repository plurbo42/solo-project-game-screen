app.controller('BuilderController', function(UserService, BuilderService) {
    console.log('BuilderController created');
    var self = this;
    self.userService = UserService;
    self.searchEncounter = BuilderService.searchEncounter;
    self.monsterArray = BuilderService.monsterArray;
    self.addToEncounter = BuilderService.addToEncounter;
  });
  