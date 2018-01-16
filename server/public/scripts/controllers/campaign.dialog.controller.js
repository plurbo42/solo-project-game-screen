app.controller('CampaignDialogController', function (UserService, CampaignService, $mdDialog) {
    console.log('CampaignDialogController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.hide = function () {
        $mdDialog.hide();
    };

    self.cancel = function () {
        $mdDialog.cancel();
    };

    self.answer = function (answer) {
        $mdDialog.hide(answer);
    };
}

);
