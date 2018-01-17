app.controller('CampaignController', function(UserService, CampaignService, $mdDialog, $routeParams) {
    console.log('CampaignController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.setSelectedCampaign = CampaignService.setSelectedCampaign;
    self.selectedCampaignId = $routeParams.id;

    self.campaignArray = CampaignService.campaignArray;
    CampaignService.getCampaign();

    self.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: 'CampaignDialogController as vm',
        templateUrl: './views/templates/campaign.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen // Only for -xs, -sm breakpoints.
      })
      .then(function(answer) {
        self.status = 'You said the information was "' + answer + '".';
        console.log(answer)
      }, function() {
        self.status = 'You cancelled the dialog.';
        console.log(answer)
      });
    };    

  });
  