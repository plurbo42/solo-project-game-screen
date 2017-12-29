app.service('CampaignService', function ($http, $location) {
  console.log('CampaignService Loaded');
  var self = this;

  self.createCampaign = function () {
    console.log('clicked create campaign')
    $http({
      method: 'POST',
      url: '/campaign/new',
    }).then(function (response) {
      console.log(response);
    })
  };

});
