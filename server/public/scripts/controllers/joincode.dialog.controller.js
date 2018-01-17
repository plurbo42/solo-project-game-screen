app.controller('JoinCodeController', function (UserService, CampaignService, $mdDialog, join_code) {
    console.log('JoinCodeController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.hide = function () {
        $mdDialog.hide();
    };
    self.join_code = join_code;
}

);