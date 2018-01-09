app.controller('BoardController', function(UserService, BoardService, CampaignService){
    console.log('BoardController created');
    var self = this;

    self.selectedCampaignId = CampaignService.selectedCampaignId;

})