app.controller('BoardController', function(UserService, BoardService, CampaignService, $routeParams){
    console.log('BoardController created');
    var self = this;

    self.selectedCampaignId = $routeParams.id;

    CampaignService.getCampaignDetail(self.selectedCampaignId);
    self.campaignDetailArray = CampaignService.campaignDetailArray;

    BoardService.getComments(self.selectedCampaignId);
    self.commentArray = BoardService.commentArray;
    self.postComment = BoardService.postComment;
    self.newComment = BoardService.newComment;
    
    UserService.getRole(self.selectedCampaignId);
    self.userRole = UserService.userRole;

})