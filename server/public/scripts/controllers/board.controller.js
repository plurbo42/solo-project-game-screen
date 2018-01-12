app.controller('BoardController', function(UserService, BoardService, CampaignService, $routeParams){
    console.log('BoardController created');
    var self = this;

    self.selectedCampaignId = $routeParams.id;

    CampaignService.getCampaignDetail(self.selectedCampaignId);
    self.campaignDetailArray = CampaignService.campaignDetailArray;


})