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

  self.createCampaign = function () {
    console.log('clicked create campaign')
    $http({
      method: 'POST',
      url: '/campaign/new',
    }).then(function (response) {
      console.log(response);
    })
  };

  //get list of campaigns for this user 
  self.getCampaign = function () {
      $http({
        method: 'GET',
        url: '/campaign/list',
      }).then(function (response) {
        console.log(response.data);
        self.campaignArray.list = response.data;
      })
  };

  self.getCampaignDetail = function (campaignId) {
    $http({
      method: 'GET',
      url: '/campaign/detail/' + campaignId,
    }).then(function(response){
      console.log(response.data);
      self.campaignDetailArray.list = response.data;
    })
  };

});
