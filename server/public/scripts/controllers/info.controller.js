app.controller('InfoController', function(UserService, CampaignService, $routeParams) {
  console.log('InfoController created');
  var self = this;
  self.userService = UserService;

  self.selectedCampaignId = CampaignService.selectedCampaignId;
});
