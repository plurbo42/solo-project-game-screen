app.controller('JoinCodeController', function (UserService, CampaignService, $mdDialog) {
    console.log('JoinCodeController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    
    self.hide = function () {
        $mdDialog.hide();
    };

}
 
);