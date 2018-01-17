app.controller('CampaignController', function(UserService, CampaignService, $mdDialog, $routeParams) {
    console.log('CampaignController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;

    self.setSelectedCampaign = CampaignService.setSelectedCampaign;
    self.selectedCampaignId = $routeParams.id;

    self.campaignArray = CampaignService.campaignArray;
    CampaignService.getCampaign();

    self.joinCampaignWithCode = CampaignService.joinCampaignWithCode;

    self.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: 'CampaignDialogController as vm',
        templateUrl: './views/templates/campaign.dialog.html',
        parent: angular.element(document.body),
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen 
      })
      .then(function() {
        console.log(submitted)
      }, function() {
        console.log(cancelled)
      });
    };    
 
    self.showJoinCode = function(ev, code) {
      console.log(ev)
      $mdDialog.show({
        controller: 'JoinCodeController as vm',
        templateUrl: './views/templates/joincode.dialog.html',
        parent: angular.element(document.body),
        locals: {join_code : code},
        targetEvent: ev,
        clickOutsideToClose:true,
        fullscreen: self.customFullscreen 
      });
    };
  

  });
  