app.service('CampaignService', function ($http, $location) {
  console.log('CampaignService Loaded');
  var self = this;
  self.campaignArray = { list: [] };

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
        url: '/campaign/list'
      }).then(function (response) {
        console.log(response.data);
        self.campaignArray.list = response.data;
      })
  }

});
