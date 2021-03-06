app.service('CampaignService', function ($http, $location) {
  console.log('CampaignService Loaded');
  var self = this;
  self.campaignArray = { list: [] };
  self.campaignDetailArray = { list: [] };

  self.selectedCampaignId = '';

  self.setSelectedCampaign = function (id) {
    console.log('The selected campaign is campaign id', id);
    self.selectedCampaignId = id;
  };

  self.createCampaign = function (newCampaignObject) {
    console.log('clicked create campaign')
    return $http({
      method: 'POST',
      url: '/campaign/new',
      data: newCampaignObject,
    }).then(function (response) {
      console.log(response);
      self.getCampaign();
    });
  };

  //get list of campaigns for this user 
  self.getCampaign = function () {
      $http({
        method: 'GET',
        url: '/campaign/list',
      }).then(function (response) {
        console.log(response.data);
        self.campaignArray.list = response.data;
      });
  };

  self.getCampaignDetail = function (campaignId) {
    $http({
      method: 'GET',
      url: '/campaign/detail/' + campaignId,
    }).then(function(response){
      console.log(response.data);
      self.campaignDetailArray.list = response.data;
    });
  };

  self.joinCampaignWithCode = function (code) {
    console.log('joining')
    $http({
      method: 'POST',
      url: '/campaign/join',
      data: code,
    }).then(function (response){
      console.log(response);
      self.getCampaign();
    });
  };

});
