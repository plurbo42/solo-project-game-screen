app.controller('CampaignDialogController', function (UserService, CampaignService, $mdDialog) {
    console.log('CampaignDialogController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    
    self.createCampaign = function (campaignObject){
        CampaignService.createCampaign(campaignObject).then($mdDialog.hide);
    }
    
    self.hide = function () {
        $mdDialog.hide();
    };

    self.cancel = function () {
        $mdDialog.cancel();
    };

}
 
);
