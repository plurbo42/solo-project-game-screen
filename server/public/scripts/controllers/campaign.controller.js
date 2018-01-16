app.controller('CampaignController', function(UserService, CampaignService, $mdDialog, $routeParams) {
    console.log('CampaignController created');
    var self = this;
    self.userService = UserService;
    self.userObject = UserService.userObject;
    self.createCampaign = CampaignService.createCampaign;

    self.setSelectedCampaign = CampaignService.setSelectedCampaign;
    self.selectedCampaignId = $routeParams.id;

    self.campaignArray = CampaignService.campaignArray;
    CampaignService.getCampaign();

    //dialog functionality - TODO - tie this to post request; create custom dialog for invite user button
    self.status = '';
    // self.addCampaignDialog = function (ev) {
    //   console.log('dialog')
    //   var confirm = $mdDialog.prompt()
    //     .title('Add a new Campaign')
    //     .textContent('Add a short campaign title')
    //     .placeholder('Campaign Name')
    //     //.arialabel('CampaignName')
    //     .initialValue('')
    //     .targetEvent(ev)
    //     .required(true)
    //     .ok('Add Campaign')
    //     .cancel('Cancel');

    //   $mdDialog.show(confirm).then(function(result) {
    //     self.status = 'Campaign Added';
    //   }, function() {
    //     self.status = 'Cancelled';
    //   });
    // };

    self.showAdvanced = function(ev) {
      $mdDialog.show({
        controller: 'CampaignDialogController',
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
  