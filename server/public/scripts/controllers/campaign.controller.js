app.controller('CampaignController', function(UserService, CampaignService) {
    console.log('CampaignController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.createCampaign = CampaignService.createCampaign;
  });
  