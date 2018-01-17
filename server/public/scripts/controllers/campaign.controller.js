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
        fullscreen: self.customFullscreen 
      })
      .then(function() {
        console.log(submitted)
      }, function() {
        console.log(cancelled)
      });
    };    

    self.showJoinCode = function(ev) {
      $mdDialog.show(
        $mdDialog.alert()
          // .parent(angular.element(document.querySelector('#popupContainer')))
          .clickOutsideToClose(true)
          .title('This is an alert title')
          .textContent('You can specify some description text in here.')
          .ariaLabel('Alert Dialog Demo')
          .ok('Got it!')
          .targetEvent(ev)
      );
    };
  

  });
  